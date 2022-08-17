import React from "react";
import PicsumGridCard from "./PicsumGridCard";

interface PicsumGridProps {}

const PicsumGrid: React.FC<PicsumGridProps> = () => {
  return (
    <div className="h-72">
      <div className=" grid grid-cols-8 gap-4 md:grid-cols-9">
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
        <PicsumGridCard />
      </div>
    </div>
  );
};

export default PicsumGrid;
