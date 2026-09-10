import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PACKAGES } from '../lib/constants.ts';
import { useSeoMeta } from '../hooks/useSeoMeta';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Truck, Minus, Plus, Clock } from 'lucide-react';
import { images } from '@/lib';
import { useModal } from '../context/ModalContext';

const Summary: React.FC = () => {
   // SEO configuration for cart summary (noindex as it's user-specific)
   useSeoMeta({
      title: "Cart Summary - Prostanone",
      description: "Review your Prostanone order before checkout.",
      url: "/summary",
      robots: "noindex",
   });

   const { cart, removeFromCart, updateQuantity, clearCart } = useApp();
   const navigate = useNavigate();
   const { showConfirm } = useModal();

   // Calculate totals
   const subtotal = cart.reduce((acc, item) => {
      const pkg = ALL_PACKAGES.find(p => p.id === item.packageId);
      return acc + (pkg ? pkg.price * item.quantity : 0);
   }, 0);

   const shipping = 0; // Free shipping
   const total = subtotal + shipping;

   if (cart.length === 0) {
      return (
         <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-background px-4">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/">
               <Button>Return to Home</Button>
            </Link>
         </div>
      );
   }

   return (
      <div className="min-h-screen pt-24 pb-12 bg-background px-4">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
               <h1 className="text-3xl font-bold text-primary mb-2">Order Summary</h1>
               <p className="text-text-muted">Review your selected package before checkout.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
               <div className="">
                  {cart.map((item, i) => {
                     const pkg = ALL_PACKAGES.find(p => p.id === item.packageId);
                     if (!pkg) return null;
                     const lineTotal = pkg.price * item.quantity;
                     const lineSavingsText = pkg.savingsText;

                     return (
                        <div key={item.packageId} className={`flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-4 last:border-0 last:pb-0 p-4 sm:p-6 ${i % 2 === 0 ? 'bg-primary/5' : 'bg-inherit'}`}>
                           <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                              <img
                                 src={pkg.productId === 'menoset' ? images.menoset : images.prostanone}
                                 alt={pkg.productId === 'menoset' ? 'Menoset' : 'Prostanone'}
                                 className="h-16 w-auto object-contain"
                              />
                           </div>
                           <div className="grow text-left">
                              <h3 className="text-xl font-bold text-primary mb-2">{pkg.name}</h3>
                              <p className="text-text-muted text-sm mb-4">{pkg.description}</p>

                              {/* Quantity Controls */}
                              <div className="flex w-fit items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                 <button
                                    onClick={() => updateQuantity(item.packageId, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1 sm:p-2 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
                                 >
                                    <Minus size={16} />
                                 </button>
                                 <span className="text-sm sm:text-base text-center font-bold text-primary">{item.quantity}</span>
                                 <button
                                    onClick={() => updateQuantity(item.packageId, item.quantity + 1)}
                                    className="p-1 sm:p-2 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                                 >
                                    <Plus size={16} />
                                 </button>
                              </div>
                              {/* <ul className="text-sm space-y-1 inline-block text-left">
                                 <li className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /> {pkg.containers * item.quantity} Packs ({60 * pkg.containers * item.quantity} Tabs)
                                 </li>
                                 {pkg.deliveryText && (
                                    <li className="flex items-center gap-2">
                                       <Truck className="w-4 h-4 text-green-500 shrink-0" /> {pkg.deliveryText}
                                    </li>
                                 )}
                                 {pkg.usageNote && (
                                    <li className="mt-2 flex items-center gap-2 text-primary font-bold bg-accent/10 p-2 rounded-lg text-xs">
                                       <Clock className="w-4 h-4 shrink-0 text-accent" /> {pkg.usageNote}
                                    </li>
                                 )}
                              </ul> */}
                           </div>
                           <div className="flex flex-row sm:flex-col items-center md:items-end gap-3 shrink-0">
                              <div className="text-xl sm:text-2xl font-bold text-primary">₦{lineTotal.toLocaleString()}</div>
<div className='grid grid-rows-2'>
                              {lineSavingsText && (
                                 <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-400">
                                    {lineSavingsText}
                                 </div>
                              )}
                              <button
                                 onClick={async () => {
                                    const ok = await showConfirm({
                                       title: 'Remove item',
                                       message: `Remove ${pkg.name} from your cart?`,
                                       confirmLabel: 'Remove',
                                       cancelLabel: 'Keep',
                                       destructive: true,
                                    });
                                    if (ok) removeFromCart(item.packageId);
                                 }}
                                 className="text-xs text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full mt-1 border border-red-400"
                              >
                                 Remove
                              </button>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className="bg-gray-50 p-8 mt-6 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                     <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-primary">₦{total.toLocaleString()}</p>
                     </div>
                     <div className='grid sm:grid-cols-2 gap-2.5'>
                     <Button
                        size="md"
                        onClick={() => navigate('/checkout')}
                        className="w-full md:w-auto px-12 shadow-xl shadow-primary/20"
                     >
                        Secure Checkout <ArrowRight className="ml-2 w-5 h-5" />
                     </Button>
                     <Button
                        size="md"
                        onClick={async () => {
                           const ok = await showConfirm({
                              title: 'Clear cart',
                              message: 'Remove all items from your cart?',
                              confirmLabel: 'Remove',
                              cancelLabel: 'Keep',
                              destructive: true,
                           });
                           if (ok) clearCart();
                        }} 
                           className="w-full md:w-auto px-12 shadow-xl shadow-primary/20"
                     >
                        Clear cart
                     </Button>
                     </div>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-2">
                     <ShieldCheck className="w-3 h-3" /> 100% Satisfaction Guarantee • Secure Payment
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Summary;