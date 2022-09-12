import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root{
    --primary: #36393f;
    --secondary: #2f3136;
    --tertiary: rgb(32,34,37);
    --quaternary: #292b2f;
    --quinary: #393d42;
    --senary: #828386;
    --background: #fafafa;

    --white: #fff;
    --light-gray: #d6d6d6;
    --gray: #8a8c90;
    --dark-gray: #5C5C5C;

    --notification: #f84a4b;
    --formError: #D13438;
    --mention-detail: #F5B649;
    --whatsapp-color: #00F06E;
    --active-green: #03BD70;
    --active-green-hover: #05ab67;
    --active-orange: #FF5126;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        @media (max-width: 1080px){
            font-size: 93.75%;
        }

        @media (max-width: 720px){
            font-size: 87.5%;
        }
    }

    body{
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    button{
        cursor: pointer;
    }

    [disabled]{
        cursor: not-allowed;
        opacity: 0.6;
    }

    body, input, text-area, button{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6{
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }
`;
