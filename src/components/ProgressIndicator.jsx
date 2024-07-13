import PropTypes from 'prop-types';

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center my-6">
      <Step 
        number={1} 
        label="Cart" 
        icon="fas fa-shopping-cart" 
        active={currentStep >= 1} 
      />
      <ProgressLine active={currentStep >= 2} />
      <Step 
        number={2} 
        label="Shipping" 
        icon="fas fa-shipping-fast" 
        active={currentStep >= 2} 
      />
      <ProgressLine active={currentStep >= 3} />
      <Step 
        number={3} 
        label="Payment" 
        icon="fas fa-credit-card" 
        active={currentStep >= 3} 
      />
      <ProgressLine active={currentStep >= 4} />
      <Step 
        number={4} 
        label="Confirm" 
        icon="fas fa-check" 
        active={currentStep >= 4} 
      />
    </div>
  );
};

const Step = ({ label, icon, active }) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center 
        ${active ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-500'}`}
      >
        <i className={icon}></i>
      </div>
      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
};

const ProgressLine = ({ active }) => {
  return (
    <div className={`flex-1 h-1 ${active ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
  );
};

// Define PropTypes for ProgressIndicator
ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

// Define PropTypes for Step
Step.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

// Define PropTypes for ProgressLine
ProgressLine.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default ProgressIndicator;
