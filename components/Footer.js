import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-700 p-4">
      <div className="container mx-auto text-center font-bold text-white">
        Projeto desenvolvido por Alexandre Toito
        <div className="mt-2">
          <img
            className="w-48 inline p-4"
            src="/logo_semana_fsm.png"
            alt="FSM"
          />
          <img
            className="w-48 inline p-4"
            src="/logo_devpleno.png"
            alt="Dev Pleno"
          />
        </div>
      </div>
    </div>
  );
};
export default Footer;
