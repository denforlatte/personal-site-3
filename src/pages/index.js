import React from "react";
import { navigate } from 'gatsby';

import SEO from "../components/seo";
import LandingPage from "../templates/LandingPage";

import "../index.scss";

const Index = ({ location }) => {
  return (
    <>
      <SEO title="Home" />
      <LandingPage location={location}>
        <h2>Welcome</h2>
        <p>Hey, welcome to my site.</p>
        <p>
          I'm Danny, a software engineer from the UK. I make web apps and play
          around with cloud infrastructure. Sometimes I make games in Unity.
        </p>
        <p>
          Here you’ll find breakdowns of projects, a game or two, some blog
          posts, and whatever else I feel like sharing in my corner of the
          Internet.
        </p>
        <p>Check out my projects and see what I’ve been up to lately.</p>
        <button onClick={() => navigate("/projects")}>Projects =</button>
      </LandingPage>
    </>
  );
};

export default Index;
