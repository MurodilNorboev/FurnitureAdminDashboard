import styled from "styled-components";


export const LoginCon = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
padding: 64px 0px 64px 0px;
`;
export const LoginWrap = styled.div`
display: flex;
padding: 33px;
flex-direction: column;
align-items: flex-start;
justify-content: center;
max-width: 500px;
max-height: 620px;
border-radius: 20px;
box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.40);

h2 {
    margin-bottom: -20px;
    margin-bottom: 10px;
    color: var(--text, #373737);
    font-family: "Open Sans";
    font-size: 27px;
    font-weight: 700;
} .loginis1 {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
} .loginis1 label {
    color: rgba(55, 55, 55, 0.80);
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
} .loginis1 input {
    border: none;
    width: 59.5vmin;
    max-width: 434px;
    padding: 17px 20px;
    border-radius: 10px;
    background: rgba(55, 55, 55, 0.10);
} 
.loginis3 {

    display: flex;
    width: 100%;
    justify-content: space-between;
} .chackbox1 {
    display: flex;
    gap: 5px;
    align-items: center;
} .intut {
    border: 2px solid green;
    width: 23px;
    height: 22px;
    border-radius: 5px;
    border: none;
    background: rgba(55, 55, 55, 0.15);
} .loginis3 label {
    color: #373737;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 400;
} .loginis3 h3 {
    color: #373737;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 400;
} 
.loginis4 {
    padding-top: 25px;
    width: 100%;
} .loginis4 button {
    cursor: pointer;
    border: none;
    width: 59.5vmin;
    max-width: 434px;
    height: 50px;
    border-radius: 10px;
    background: var(--blue, #006DAB);
    color: white;
    font-size: 15px;
    font-weight: 700;
} .loginis4 :hover {
    background: var(--blue, #005DAB);
} 
.loginis5 {


    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

} .loginis5 h4 {

    display: flex;
    color: #6D6D6D;
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 700;
} .lang {
    max-width: 120px;
    width: 100%;
    border: 0.5px solid  rgba(55, 55, 55, 0.15);

}
.loginis6 {

    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
} .loginis6 img {
    border-radius: 50%;
    width: 46px;
    height: 46px;
    border: 50%;
}
.loginis7 {
    padding-top: 30px;
    padding-bottom: 20px;
    width: 100%;
} .loginis7 button {
    cursor: pointer;
    border: 2px solid var(--blue, #006DAB);
    color: var(--blue, #006DAB);
    background-color: transparent;
    width: 59.5vmin;
    max-width: 434px;
    max-height: 50px;
    height: 100vw;
    /* width: 100vw;  */
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
} .loginis7 :hover {
    background: var(--blue, #005DAB);
    color: white;
} .aut {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
@media only screen and (max-width: 1300px){
    .LoginWrap {
        padding: 0px;
        margin: 0px;
    }
}
`;

// Register page 
export const LoginWraps = styled.div`
display: flex;
padding: 10px 33px;
flex-direction: column;
align-items: flex-start;
justify-content: center;
max-width: 500px;
border-radius: 20px;
box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.40);

h2 {
    color: var(--text, #373737);
    font-family: "Open Sans";
    font-size: 27px;
    font-weight: 700;
} .loginis1 {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
} .loginis1 label {
    color: rgba(55, 55, 55, 0.80);
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
} .loginis1 input {
    border: none;
    width: 59.5vmin;
    max-width: 434px;
    padding: 17px 20px;
    border-radius: 10px;
    background: rgba(55, 55, 55, 0.10);
} .select {
    border: none;
    width: 59.5vmin;
    max-width: 434px;
    padding: 17px 20px;
    border-radius: 10px;
    background: rgba(55, 55, 55, 0.10);
} 
.loginis3 {

    display: flex;
    width: 100%;
    justify-content: space-between;
} .chackbox1 {
    margin-top: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
} .intut {
    border: 2px solid green;
    width: 23px;
    height: 22px;
    border-radius: 5px;
    border: none;
    background: rgba(55, 55, 55, 0.15);
} .loginis3 label {
    color: #373737;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 400;
} .loginis3 h3 {
    color: #373737;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 400;
} 
.loginis4 {
    padding-top: 25px;
    width: 100%;
} .loginis4 button {
    cursor: pointer;
    border: none;
    width: 59.5vmin;
    max-width: 434px;
    height: 50px;
    border-radius: 10px;
    background: var(--blue, #006DAB);
    color: white;
    font-size: 15px;
    font-weight: 700;
} .loginis4 :hover {
    background: var(--blue, #005DAB);
} 
.loginis5 {


    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

} .loginis5 h4 {

    display: flex;
    color: #6D6D6D;
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 700;
} .lang {
    max-width: 120px;
    width: 100%;
    border: 0.5px solid  rgba(55, 55, 55, 0.15);

}
.loginis6 {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
} .loginis6 img {
    border-radius: 50%;
    width: 46px;
    height: 46px;
    border: 50%;
}
.loginis7 {
    padding-top: 30px;
    padding-bottom: 20px;
    width: 100%;
} .loginis7 button {
    cursor: pointer;
    border: 2px solid var(--blue, #006DAB);
    color: var(--blue, #006DAB);
    background-color: transparent;
    width: 59.5vmin;
    max-width: 434px;
    max-height: 50px;
    height: 100vw;
    /* width: 100vw;  */
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
} .loginis7 :hover {
    background: var(--blue, #005DAB);
    color: white;
} .aut {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
@media only screen and (max-width: 1300px){
    .LoginWrap {
        padding: 0px;
        margin: 0px;
    }
}
`;
