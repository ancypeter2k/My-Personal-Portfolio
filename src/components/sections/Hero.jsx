import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";

// --------------------------- Styled Components ---------------------------

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  min-height: 50%;
  background: transparent;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 80%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  transform: translate(-50%, -50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;

  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;

  @media (max-width: 960px) {
    order: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  margin-bottom: 16px;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  padding-bottom:20px:
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  margin-bottom: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const Img = styled.img`
  border-radius: 12px;
  width: 100%;
  height: auto;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

// ----------------------------- Main Component -----------------------------

const Hero = () => {
  return (
    <section id="About">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>

        <HeroInnerContainer>
          <HeroLeftContainer>
            <Tilt>
              <Img src={HeroImg} alt={Bio.name} />
            </Tilt>
          </HeroLeftContainer>
          <HeroRightContainer>
            <Title>
              Hi, I am <br /> {Bio.name}
            </Title>
            <TextLoop>
              <div>I am a</div>
              <div>
                <Span>
                  <Typewriter
                    options={{
                      strings: Bio.roles,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </Span>
              </div>
            </TextLoop>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </section>
  );
};

export default Hero;
