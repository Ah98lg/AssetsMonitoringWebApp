import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root{
    --white: #fff;
    --light-gray: #d6d6d6;
    --gray: #8a8c90;
    --dark-gray: #5C5C5C;

    --error: #D13438;
    --active-green: #03BD70;
    --alert: #ebfa00
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
