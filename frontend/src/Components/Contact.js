import React from "react";
import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;
    margin-top: 5rem;

    .heading {
      text-transform: capitalize;
      font-size: 4rem;
      color: green;
      font-weight: 550;
      margin-bottom: 3rem;
    }

    .container {
      margin-top: 7rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 4rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(1.2);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h1 className="heading">Please provide your "feedback" here</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30464.79928751395!2d78.52944295824875!3d17.35892474986085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98aeadc10291%3A0x6e2e7faa27222ade!2sL.%20B.%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1686805135695!5m2!1sen!2sin"
        width="80%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/mqkorqvz"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              name="Email"
              required
              autoComplete="off"
            />
            <textarea
              placeholder="Enter your Feedback"
              name="Message"
              id=""
              cols="35"
              rows="15"
              required
              autoComplete="off"
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
