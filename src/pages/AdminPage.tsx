import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  TrendingUp,
  CreditCard,
  Banknote,
  Download,
  Trash2,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
} from 'lucide-react';
import { OrderDetails } from '../types/product';
import { BRAND_CONFIG } from '../config/brandConfig';

const STORAGE_ORDERS_KEY = 'scented_admin_orders_v1';

export const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING_COD'>('ALL');

  // Load orders from localStorage and include any recent checkout
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem(STORAGE_ORDERS_KEY);
      let list: OrderDetails[] = stored ? JSON.parse(stored) : [];

      // Also check if there's a last checkout from sessionStorage not yet in the master list
      const lastSession = sessionStorage.getItem('scented_last_order');
      if (lastSession) {
        const lastOrder: OrderDetails = JSON.parse(lastSession);
        if (!list.some((o) => o.orderId === lastOrder.orderId)) {
          list.unshift(lastOrder);
          localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(list));
        }
      }

      setOrders(list);
    } catch (e) {
      console.error('Failed to load admin orders:', e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLoadSampleOrders = () => {
    const sampleOrders: OrderDetails[] = [
      {
        orderId: 'SBG-782914',
        createdAt: '26 October 2026',
        customerName: 'Aarav Singhania',
        email: 'aarav.singhania@example.com',
        phone: '+91 98201 44521',
        address: 'Flat 14B, Sea Face Towers, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400018',
        items: [
          {
            id: 'forest-bloom-50 ml',
            productId: 'forest-bloom',
            name: 'Forest Bloom',
            volume: '50 ml',
            price: 2499,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=400&auto=format&fit=crop',
            family: 'Fresh Woody',
          },
          {
            id: 'jasmine-whisper-50 ml',
            productId: 'jasmine-whisper',
            name: 'Jasmine Whisper',
            volume: '50 ml',
            price: 2199,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=400&auto=format&fit=crop',
            family: 'Floral',
          },
        ],
        subtotal: 4698,
        discount: 470,
        shipping: 0,
        total: 4228,
        paymentMethod: 'Razorpay Gateway (Instant UPI)',
        paymentStatus: 'PAID',
        transactionId: 'pay_Nz9a8BkL1294',
      },
      {
        orderId: 'SBG-645021',
        createdAt: '27 October 2026',
        customerName: 'Pooja Chhabra',
        email: 'pooja.chhabra@example.com',
        phone: '+91 99104 88392',
        address: 'Villa 12, Golf Course Road, Sector 42',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122002',
        items: [
          {
            id: 'sandalwood-serenity-100 ml',
            productId: 'sandalwood-serenity',
            name: 'Sandalwood Serenity',
            volume: '100 ml',
            price: 4599,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop',
            family: 'Sandalwood',
          },
        ],
        subtotal: 4599,
        discount: 0,
        shipping: 0,
        total: 4599,
        paymentMethod: 'Credit Card (Ending in •••• 4402)',
        paymentStatus: 'PAID',
        transactionId: 'TXN_CARD_78912',
      },
      {
        orderId: 'SBG-519830',
        createdAt: '28 October 2026',
        customerName: 'Devika Menon',
        email: 'devika.menon@example.com',
        phone: '+91 94471 22849',
        address: '44 Panampilly Nagar',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682036',
        items: [
          {
            id: 'citrus-garden-50 ml',
            productId: 'citrus-garden',
            name: 'Citrus Garden',
            volume: '50 ml',
            price: 1899,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=400&auto=format&fit=crop',
            family: 'Citrus Botanical',
          },
        ],
        subtotal: 1899,
        discount: 0,
        shipping: 150,
        total: 2049,
        paymentMethod: 'Cash on Delivery (Doorstep)',
        paymentStatus: 'PENDING_COD',
        transactionId: 'COD_VERIFIED',
      },
    ];

    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(sampleOrders));
    setOrders(sampleOrders);
  };

  const handleClearOrders = () => {
    if (window.confirm('Clear all demo orders from local storage?')) {
      localStorage.removeItem(STORAGE_ORDERS_KEY);
      sessionStorage.removeItem('scented_last_order');
      setOrders([]);
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders available to export.');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer Name', 'Email', 'Phone', 'City', 'State', 'PIN Code', 'Items', 'Total (INR)', 'Payment Method', 'Payment Status', 'Transaction ID'];
    const rows = orders.map((o) => [
      o.orderId,
      `"${o.createdAt}"`,
      `"${o.customerName}"`,
      o.email,
      `"${o.phone}"`,
      `"${o.city}"`,
      `"${o.state}"`,
      o.pincode,
      `"${o.items.map((i) => `${i.name} (${i.volume} x${i.quantity})`).join('; ')}"`,
      o.total,
      `"${o.paymentMethod}"`,
      o.paymentStatus,
      o.transactionId || 'N/A',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `scented_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.paymentStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inId = o.orderId.toLowerCase().includes(q);
      const inName = o.customerName.toLowerCase().includes(q);
      const inEmail = o.email.toLowerCase().includes(q);
      const inCity = o.city.toLowerCase().includes(q);
      return inId || inName || inEmail || inCity;
    }
    return true;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const paidCount = orders.filter((o) => o.paymentStatus === 'PAID').length;
  const codCount = orders.filter((o) => o.paymentStatus === 'PENDING_COD').length;

  return (
    <div className="bg-[#F7F3EB] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Storefront Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#20382D] hover:text-[#B69A68] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Storefront
          </Link>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#B69A68]">
            Maison Atelier Management
          </span>
        </div>

        {/* Demo Transparency Banner */}
        <div className="p-4 bg-[#20382D] text-[#F7F3EB] border border-[#B69A68] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#B69A68] shrink-0" />
            <div>
              <h2 className="font-serif text-lg text-[#F7F3EB] font-medium">
                Admin Demonstration Console
              </h2>
              <p className="text-xs text-[#A6AD98] mt-0.5">
                Orders are stored in browser localStorage. Easily connect this console to PostgreSQL, Supabase, or Firebase for production.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSampleOrders}
              className="px-3 py-1.5 bg-[#B69A68] hover:bg-[#D9C398] text-[#20231F] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Load Sample Orders
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 border border-[#B69A68] text-[#F7F3EB] hover:bg-white/10 text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 border border-[#A6AD98]/30 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A6AD98]">
              <span className="uppercase tracking-wider">Total Sales Volume</span>
              <TrendingUp className="w-4 h-4 text-[#B69A68]" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#20382D] block">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-[#A6AD98] block">Across {orders.length} total orders</span>
          </div>

          <div className="bg-white p-6 border border-[#A6AD98]/30 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A6AD98]">
              <span className="uppercase tracking-wider">Total Orders</span>
              <Package className="w-4 h-4 text-[#20382D]" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#20382D] block">
              {orders.length}
            </span>
            <span className="text-[10px] text-[#A6AD98] block">Simulated test orders</span>
          </div>

          <div className="bg-white p-6 border border-[#A6AD98]/30 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A6AD98]">
              <span className="uppercase tracking-wider">Paid Online / UPI</span>
              <CreditCard className="w-4 h-4 text-[#20382D]" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#20382D] block">
              {paidCount}
            </span>
            <span className="text-[10px] text-[#20382D] block font-medium">Verified settlement</span>
          </div>

          <div className="bg-white p-6 border border-[#A6AD98]/30 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A6AD98]">
              <span className="uppercase tracking-wider">Pending COD</span>
              <Banknote className="w-4 h-4 text-[#8C7345]" />
            </div>
            <span className="font-serif text-3xl font-bold text-[#8C7345] block">
              {codCount}
            </span>
            <span className="text-[10px] text-[#A6AD98] block">Pay upon doorstep arrival</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 border border-[#A6AD98]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6AD98]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by Order ID, Customer Name, City..."
              className="w-full pl-9 pr-3 py-2 bg-[#FCFAF6] border border-[#A6AD98]/40 text-xs text-[#20231F] focus:outline-none focus:border-[#20382D]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex border border-[#A6AD98]/40 text-xs">
              {(['ALL', 'PAID', 'PENDING_COD'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 transition-colors ${
                    statusFilter === status
                      ? 'bg-[#20382D] text-[#F7F3EB] font-medium'
                      : 'bg-white text-[#20231F] hover:bg-[#ECE5D8]'
                  }`}
                >
                  {status === 'ALL' && 'All'}
                  {status === 'PAID' && 'Paid'}
                  {status === 'PENDING_COD' && 'Pending COD'}
                </button>
              ))}
            </div>

            {orders.length > 0 && (
              <button
                onClick={handleClearOrders}
                className="p-2 text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                title="Clear all orders"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-[#A6AD98]/30 shadow-xs overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <Package className="w-12 h-12 text-[#A6AD98] mx-auto" />
              <h3 className="font-serif text-2xl text-[#20382D]">No Orders Recorded Yet</h3>
              <p className="text-xs text-[#20231F]/70 max-w-sm mx-auto">
                Place a test order on the checkout page or click "Load Sample Orders" above to populate realistic customer entries.
              </p>
              <button
                onClick={handleLoadSampleOrders}
                className="px-6 py-2.5 bg-[#20382D] text-[#F7F3EB] text-xs uppercase tracking-wider hover:bg-[#B69A68] hover:text-[#20231F] transition-colors"
              >
                Load Sample Orders
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#20382D] text-[#F7F3EB] border-b border-[#B69A68]/30 font-mono text-[11px] uppercase tracking-wider">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A6AD98]/20">
                {filteredOrders.map((order) => {
                  const isPaid = order.paymentStatus === 'PAID';
                  return (
                    <tr key={order.orderId} className="hover:bg-[#FCFAF6] transition-colors">
                      <td className="p-4 font-mono font-bold text-[#20382D]">
                        {order.orderId}
                      </td>
                      <td className="p-4 text-[#20231F]/70 whitespace-nowrap">
                        {order.createdAt}
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-[#20382D] block">{order.customerName}</span>
                        <span className="text-[10px] text-[#A6AD98] block">{order.email}</span>
                        <span className="text-[10px] text-[#A6AD98] block">{order.phone}</span>
                      </td>
                      <td className="p-4 text-[#20231F]/80">
                        {order.city}, {order.state}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <span key={idx} className="block text-[#20231F]/80 whitespace-nowrap">
                              {it.quantity}x {it.name} ({it.volume})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-serif font-bold text-sm text-[#20382D] whitespace-nowrap">
                        ₹{order.total.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-[#20231F]/75">
                        <span className="block">{order.paymentMethod}</span>
                        {order.transactionId && (
                          <span className="text-[10px] font-mono text-[#A6AD98] block">
                            Ref: {order.transactionId}
                          </span>
                        )}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                            isPaid
                              ? 'bg-[#20382D] text-[#D9C398] border-[#B69A68]'
                              : 'bg-[#ECE5D8] text-[#8C7345] border-[#8C7345]'
                          }`}
                        >
                          {isPaid ? <CheckCircle2 className="w-3 h-3 text-[#B69A68]" /> : <Clock className="w-3 h-3 text-[#8C7345]" />}
                          {isPaid ? 'PAID' : 'PENDING COD'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
