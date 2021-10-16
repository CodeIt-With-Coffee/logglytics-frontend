import styled from "styled-components";

export const Card = styled.div<{
  isCenter?: boolean;
  isCursor?: boolean;
  direction?: string;
}>`
  display: flex;
  width: 200px;
  height: 150px;
  padding: 10px;
  border-radius: 16px;
  background-color: #e5cb6d;
  box-shadow: 0px 5px 10px #80774f;
  margin: 15px;
  ${(p) => p.direction && `flex-direction: ${p.direction};`}
  ${(p) => p.isCenter && `justify-content: center; align-items: center;`};
  ${(p) => p.isCursor && `cursor: pointer;`}
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const CardSubtitle = styled.div`
  font-size: 14px;
  font-weight: normal;
`;

export const CardLink = styled.div`
  font-size: 14px;
  font-weight: normal;
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
`;
