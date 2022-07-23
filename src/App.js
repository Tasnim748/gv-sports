import { Fragment } from 'react';
import Navigation from './components/header/navigation';
import Carouzel from './components/header/carouzel';
import BookingForm from './components/bookComponents/bookingForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path='/' element={<Carouzel />} />
        <Route path='/book' element={<BookingForm />} />
      </Routes>
    </Fragment>
  );
}

export default App;
