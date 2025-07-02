import BanGiaoTable from "@/components/chotca/BanGiaoTable";
import React from "react";

const ChotCaPage = () => {
  return (
    <div className="pb-20">
      <section className="container flex flex-col justify-center gap-16 my-24">

        {/* Box with border, border-radius, and box-shadow */}
        <div className="border border-default-500 rounded-xl shadow-lg p-8 bg-white">
          <BanGiaoTable />
        </div>
      </section>
    </div>
  );
};

export default ChotCaPage;
