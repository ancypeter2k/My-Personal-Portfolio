import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

/* ----------------------- Animations & Styles ----------------------- */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

/* ------------------------------ Main Component ------------------------------ */
const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -------------------- Form Validation --------------------
  const validate = (data) => {
    const errors = {};
    const email = data.get("email");

    if (!data.get("name")) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!data.get("message")) errors.message = "Message is required";

    return errors;
  };

  // -------------------- Form Submission --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const errors = validate(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setMessage("");
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Message sent successfully!");
        form.current.reset();
      } else {
        setMessage("Failed to send message. Try again.");
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later: ", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000); // auto-clear after 5s
    }
  };

  // -------------------- Render UI --------------------
  return (
    <Container id="Education">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Open to questions, feedback, or exciting opportunities — feel free to drop a message anytime!
        </Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="8fd4e823-2a59-49be-bbdd-832294fb86a7" />

          <ContactTitle>Email Me ✉️ </ContactTitle>

          <ContactInput name="name" placeholder="Your Name" />
          {formErrors.name && (
            <ErrorMessage>
              <FiAlertCircle /> {formErrors.name}
            </ErrorMessage>
          )}

          <ContactInput type="email" name="email" placeholder="Your Email" />
          {formErrors.email && (
            <ErrorMessage>
              <FiAlertCircle /> {formErrors.email}
            </ErrorMessage>
          )}

          <ContactInput name="subject" placeholder="Subject" />

          <ContactInputMessage name="message" placeholder="Your Message" rows={4} />
          {formErrors.message && (
            <ErrorMessage>
              <FiAlertCircle /> {formErrors.message}
            </ErrorMessage>
          )}

          <ContactButton type="submit" value={isSubmitting ? "Sending..." : "Send"} disabled={isSubmitting} />
        </ContactForm>

        {message && (
          <>
            {message.includes("success") ? (
              <SuccessMessage>
                <FiCheckCircle /> {message}
              </SuccessMessage>
            ) : (
              <ErrorMessage>
                <FiAlertCircle /> {message}
              </ErrorMessage>
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Contact;
