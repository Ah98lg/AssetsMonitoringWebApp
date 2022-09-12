import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  padding: 2rem 2rem 0 2rem;
  height: 20rem;
  width: 20rem;
`;

export const IconDiv = styled.div`
  display: flex;
  background: #f2efef;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
`;

export const Header = styled.div`
  color: var(--gray);
  font-size: 20px;
  margin: 1rem 0 0;
`;

export const Value = styled.div`
  height: fit-content;
  span {
    font-size: 3.5rem;
    font-weight: 500;
    color: var(--dark-gray);
  }
`;

export const Footer = styled.div`
  padding: 1.2rem 0 0;
  color: #5cb1ff;
  cursor: pointer;
`;
