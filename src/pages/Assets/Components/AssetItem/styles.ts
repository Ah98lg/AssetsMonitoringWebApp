import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  align-items: center;

  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
`;

export const Labels = styled.div`
  display: flex;
  width: 820px;
  justify-content: space-between;
  color: var(--gray);
`;

export const Pair = styled.div`
  display: flex;
  position: relative;
  top: -10px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .description {
    width: 22rem;
  }

  span:last-child {
    color: var(--dark-gray);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
