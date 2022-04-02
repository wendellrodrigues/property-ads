import styled from "styled-components";

export const Wrapper = styled.div`
  width: 300px;
  background: #fffff;
  height: auto;
  border-radius: 15px;
  box-shadow: 0px 0px 5px #d1d1d1;
`;

export const Form = styled.div`
  display: grid;
  position: relative;
  padding: 20px;
  margin: auto;
  width: 100%;
  gap: 20px;
  justify-items: center;
`;

export const Input = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 40px auto;
  align-items: center;
  position: relative;
  border-color:#e77b7b
  border-style: solid;
  margin: auto;
  border-width: 3px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 45px;
  background: #ffffff;
  box-shadow: ${(props) =>
    props.alert == true ? "0px 0px 10px #f07a7a" : "inset 0px 0px 2px #d1d1d1"};
  transition: 1s linear;

`;

export const Icon = styled.img`
  display: grid;
  position: relative;
  margin-left: 20px;
  width: 15px;
  height: 15px;
  opacity: 0.7;
`;

export const TextField = styled.input`
  overflow: hidden;
  background: none;
  border: none;
  margin-left: 10px;
  outline: none;
  color: #353535;
  ::placeholder {
    color: ${(props) => (props.alert == true ? "#f07a7a" : "#5d5d5d")};
  }
  line-height: normal;
`;

export const SubmitButton = styled.div`
  display: grid;
  margin: auto;
  margin-top: 10px;
  height: 45px;
  width: 100%;
  background: #000000;
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  transition: 0.2s ease-in;
  :hover {
    background: #1c1c1c;
    cursor: pointer;
  }
`;

export const SubmitText = styled.p`
  color: white;
  font-size: 17px;
  font-weight: bold;
  line-height: normal;
`;
