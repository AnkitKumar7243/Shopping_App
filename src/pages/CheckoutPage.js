import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CartSummary from '../components/cart/CartSummary';
import { clearCart } from '../redux/slices/cartSlice';
import { showNotification } from '../redux/slices/uiSlice';
import { openAuthModal } from '../redux/slices/uiSlice';
import AuthModal from '../components/auth/AuthModal';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.space[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.form`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.space[6]};
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[1]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.base};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  input {
    margin-right: ${({ theme }) => theme.space[3]};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space[1]};
`;

const LoginPrompt = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.base};
  margin-bottom: ${({ theme }) => theme.space[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    margin: 0;
  }
`;

const LoginButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.base};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState({});
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate shipping info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Validate payment info
    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process order
      dispatch(clearCart());
      navigate('/order-confirmation');
      dispatch(showNotification({
        status: 'success',
        title: 'Order Placed',
        message: 'Your order has been placed successfully!',
      }));
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Checkout</PageTitle>
      </PageHeader>
      
      {!isAuthenticated && (
        <LoginPrompt>
          <p>Already have an account? Log in for a faster checkout experience.</p>
          <LoginButton onClick={() => dispatch(openAuthModal('login'))}>
            Log In
          </LoginButton>
        </LoginPrompt>
      )}
      
      <CheckoutLayout>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Shipping Information</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </Select>
              </FormGroup>
            </FormRow>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Payment Method</SectionTitle>
            
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === 'creditCard'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Credit / Debit Card</strong>
                  <div>Pay securely with your card</div>
                </div>
              </RadioOption>
              
              <RadioOption>
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                />
                <div>
                  <strong>PayPal</strong>
                  <div>Pay with your PayPal account</div>
                </div>
              </RadioOption>
              
              <RadioOption>
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={formData.paymentMethod === 'cashOnDelivery'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <div>Pay when you receive your order</div>
                </div>
              </RadioOption>
            </RadioGroup>
            
            {formData.paymentMethod === 'creditCard' && (
              <div style={{ marginTop: '1rem' }}>
                <FormGroup>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  {errors.cardName && <ErrorMessage>{errors.cardName}</ErrorMessage>}
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                    {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                    {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                  </FormGroup>
                </FormRow>
              </div>
            )}
          </FormSection>
        </CheckoutForm>
        
        <CartSummary isCheckoutPage={true} />
      </CheckoutLayout>
      
      <AuthModal />
    </PageContainer>
  );
};

export default CheckoutPage;
