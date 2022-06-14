import React from "react";
import ReviewForm from "../components/ReviewForm";
import { SingleBeach } from "../components/SingleBeach";
import ReviewFeed from "../components/ReviewFeed";
import { Header } from "../components/Header";

export const Beach = () => {
  return (
    <div>
      <Header />
      <SingleBeach />
      <ReviewFeed />
      <ReviewForm />
    </div>
  );
};
