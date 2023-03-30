import React from "react";

const Heading = ({ title, children }: { title: string; children?: any }) => {
  return (
    <header className="est-title">
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default Heading;
