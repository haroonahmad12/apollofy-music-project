import styled from "styled-components";

const FormHeading = styled.h3`
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export default FormHeading;
