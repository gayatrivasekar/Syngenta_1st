import React from "react";
import "./CatalogCard.css";
import { ChevronRight, ChevronDown } from "lucide-react";

const CatalogCard = ({ title, description, isOpen, onClick, children }) => {
  return (
    <div className="catalog-card">
      <div className="catalog-header" onClick={onClick}>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="arrow-icon">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </div>
      {isOpen && <div className="catalog-body">{children}</div>}
    </div>
  );
};

export default CatalogCard;