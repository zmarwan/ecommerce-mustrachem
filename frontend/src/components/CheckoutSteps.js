import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Se connecter</div>
      <div className={props.step2 ? 'active' : ''}>Informations de livraison</div>
      <div className={props.step3 ? 'active' : ''}>Paiement</div>
      <div className={props.step4 ? 'active' : ''}>Commander</div>
    </div>
  );
}
