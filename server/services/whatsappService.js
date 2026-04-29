import axios from "axios";

/**
 * Service to send WhatsApp messages using Meta API
 */
export const sendWhatsAppTemplate = async (to, templateName, components, buttonComponents = null) => {
  try {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      throw new Error("WhatsApp credentials not configured in environment variables");
    }

    // Clean phone number: remove non-digits
    const cleanTo = to.replace(/\D/g, "");

    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

    const templateData = {
      name: templateName,
      language: {
        code: "en_US", // Confirmed by user
      },
      components: [
        {
          type: "body",
          parameters: components,
        },
      ],
    };

    // Add button parameters if provided
    if (buttonComponents) {
      templateData.components.push({
        type: "button",
        sub_type: "url", // Most common for dynamic buttons in OTP templates
        index: "0",
        parameters: buttonComponents,
      });
    }

    let formattedNumber = to.replace(/\D/g, "");
    if (formattedNumber.length === 10) {
      formattedNumber = `91${formattedNumber}`;
    }

    const data = {
      messaging_product: "whatsapp",
      to: formattedNumber,
      type: "template",
      template: templateData,
    };

    console.log("Sending WhatsApp Template to:", formattedNumber);
    console.log("Payload:", JSON.stringify(data, null, 2));

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("WhatsApp API Success Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Specifically send the OTP template
 */
export const sendLeadOTP = async (mobile, name, purpose, otp) => {
  // Mapping variables to the template: ptrm_otp_preset
  // Based on user description: 4 variables
  // My assumption: Var 1: Name, Var 2: OTP, Var 3: Purpose, Var 4: Brand
  const components = [
    { type: "text", text: otp },
    { type: "text", text: "Prime Time" },
    { type: "text", text: "10 minutes" },
    { type: "text", text: "+919810910686" },
  ];

  const buttonComponents = [
    { type: "text", text: otp },
  ];

  return await sendWhatsAppTemplate(mobile, "ptrm_otp", components, buttonComponents);
};
