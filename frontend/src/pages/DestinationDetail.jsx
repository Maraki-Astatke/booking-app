// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { ModeToggle } from '@/components/ui/mode-toggle';
// import { Button } from '@/components/ui/button';

// function DestinationDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useAuth();
//   const [destination, setDestination] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [bookingDate, setBookingDate] = useState('');
//   const [travelers, setTravelers] = useState(1);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteLoading, setFavoriteLoading] = useState(false);

//   // Fetch destination details
//   useEffect(() => {
//     async function fetchDestination() {
//       try {
//         const response = await fetch(`http://localhost:5001/api/destinations/${id}`);
//         const data = await response.json();
        
//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to load destination');
//         }
        
//         setDestination(data.destination);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchDestination();
//   }, [id]);

//   // Check if destination is favorited
//   useEffect(() => {
//     async function checkIfFavorite() {
//       if (token && id) {
//         try {
//           const response = await fetch(`http://localhost:5001/api/favorites/check/${id}`, {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//           const data = await response.json();
//           setIsFavorite(data.isFavorite);
//         } catch (err) {
//           console.error('Failed to check favorite', err);
//         }
//       }
//     }
//     checkIfFavorite();
//   }, [token, id]);

//   // Handle booking
//   async function handleBooking(e) {
//     e.preventDefault();
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setBookingLoading(true);
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await fetch('http://localhost:5001/api/bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           destination_id: parseInt(id),
//           booking_date: bookingDate,
//           travelers: parseInt(travelers)
//         })
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Booking failed');
//       }

//       setSuccessMessage('Booking confirmed! Redirecting to dashboard...');
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setBookingLoading(false);
//     }
//   }

//   // Handle favorite toggle
//   async function handleToggleFavorite() {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     setFavoriteLoading(true);
//     try {
//       if (isFavorite) {
//         const response = await fetch(`http://localhost:5001/api/favorites/${id}`, {
//           method: 'DELETE',
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
        
//         if (response.ok) {
//           setIsFavorite(false);
//         }
//       } else {
//         const response = await fetch('http://localhost:5001/api/favorites', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ destination_id: parseInt(id) })
//         });
        
//         if (response.ok) {
//           setIsFavorite(true);
//         }
//       }
//     } catch (err) {
//       console.error('Failed to toggle favorite', err);
//     } finally {
//       setFavoriteLoading(false);
//     }
//   }

//   if (loading) return (
//     <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
//       <div className="text-center text-slate-600 dark:text-slate-300">Loading...</div>
//     </div>
//   );

//   if (error || !destination) return (
//     <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
//       <div className="text-center text-red-500">{error || 'Destination not found'}</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-950">
//       <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
//         <div>
//           <h1 className="text-2xl font-bold text-[#52b788]">{destination.title}</h1>
//           <p className="text-sm text-slate-600 dark:text-slate-300">{destination.location}</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <ModeToggle />
//           <Button
//             onClick={handleToggleFavorite}
//             disabled={favoriteLoading}
//             variant="outline"
//             className={`rounded-xl ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : ''}`}
//           >
//             {isFavorite ? '❤️ Saved' : '🤍 Save to Favorites'}
//           </Button>
//           <Link to="/destinations">
//             <Button variant="outline" className="rounded-xl">
//               Back
//             </Button>
//           </Link>
//         </div>
//       </header>

//       <main className="mx-auto max-w-6xl px-6 py-8">
//         {successMessage && (
//           <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl">
//             {successMessage}
//           </div>
//         )}
        
//         {error && (
//           <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="rounded-xl overflow-hidden">
//             <img 
//               src={destination.image_url || 'https://via.placeholder.com/600x400'} 
//               alt={destination.title} 
//               className="w-full h-96 object-cover" 
//             />
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">About</h2>
//               <p className="mt-2 text-slate-600 dark:text-slate-300">{destination.description}</p>
//             </div>

//             <div className="flex gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
//                 <p className="text-lg font-semibold text-slate-800 dark:text-white">{destination.duration_days} days</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
//                 <p className="text-2xl font-bold text-[#52b788]">{destination.price}</p>
//               </div>
//             </div>

//             <div className="border-t pt-6 border-slate-200 dark:border-slate-800">
//               <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Book This Trip</h3>
//               <form onSubmit={handleBooking} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                     Travel Date
//                   </label>
//                   <input
//                     type="date"
//                     value={bookingDate}
//                     onChange={(e) => setBookingDate(e.target.value)}
//                     required
//                     min={new Date().toISOString().split('T')[0]}
//                     className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                     Travelers
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     value={travelers}
//                     onChange={(e) => setTravelers(parseInt(e.target.value))}
//                     required
//                     className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//                   />
//                 </div>

//                 <div className="pt-2">
//                   <p className="text-lg font-semibold text-slate-800 dark:text-white">
//                     Total: {(destination.price || 0) * travelers}
//                   </p>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={bookingLoading}
//                   className="w-full rounded-xl bg-[#52b788] hover:bg-[#47a67d] text-white"
//                 >
//                   {bookingLoading ? 'Processing...' : 'Book Now'}
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DestinationDetail;


import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Button } from '@/components/ui/button';

function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Fetch destination details
  useEffect(() => {
    async function fetchDestination() {
      try {
        const response = await fetch(`https://booking-production-a1ed.up.railway.app/api/destinations/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load destination');
        }
        
        setDestination(data.destination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDestination();
  }, [id]);

  // Check if destination is favorited
  useEffect(() => {
    async function checkIfFavorite() {
      if (token && id) {
        try {
          const response = await fetch(`https://booking-production-a1ed.up.railway.app/api/favorites/check/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        } catch (err) {
          console.error('Failed to check favorite', err);
        }
      }
    }
    checkIfFavorite();
  }, [token, id]);

  // Handle booking
  async function handleBooking(e) {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://booking-production-a1ed.up.railway.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          destination_id: parseInt(id),
          booking_date: bookingDate,
          travelers: parseInt(travelers)
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      setSuccessMessage('Booking confirmed! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setBookingLoading(false);
    }
  }

  // Handle favorite toggle
  async function handleToggleFavorite() {
    if (!token) {
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        const response = await fetch(`https://booking-production-a1ed.up.railway.app/api/favorites/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        const response = await fetch('https://booking-production-a1ed.up.railway.app/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ destination_id: parseInt(id) })
        });
        
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    } finally {
      setFavoriteLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <div className="text-center text-slate-600 dark:text-slate-300">Loading...</div>
    </div>
  );

  if (error || !destination) return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <div className="text-center text-red-500">{error || 'Destination not found'}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-[#52b788]">{destination.title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">{destination.location}</p>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            onClick={handleToggleFavorite}
            disabled={favoriteLoading}
            variant="outline"
            className={`rounded-xl ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : ''}`}
          >
            {isFavorite ? '❤️ Saved' : '🤍 Save to Favorites'}
          </Button>
          <Link to="/destinations">
            <Button variant="outline" className="rounded-xl">
              Back
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden">
            <img 
              src={destination.image_url || 'https://via.placeholder.com/600x400'} 
              alt={destination.title} 
              className="w-full h-96 object-cover" 
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">About</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{destination.description}</p>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">{destination.duration_days} days</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Price</p>
                <p className="text-2xl font-bold text-[#52b788]">{destination.price}</p>
              </div>
            </div>

            <div className="border-t pt-6 border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Book This Trip</h3>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">
                    Total: {(destination.price || 0) * travelers}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full rounded-xl bg-[#52b788] hover:bg-[#47a67d] text-white"
                >
                  {bookingLoading ? 'Processing...' : 'Book Now'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DestinationDetail;