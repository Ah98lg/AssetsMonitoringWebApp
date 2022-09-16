import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .SelectDiv {
    width: fit-content;
  }
`;

export const EmptyContainer = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem 0;
`;
