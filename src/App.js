import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Popup from './Popup';
import CustomTable from './Table';

function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<CustomTable />} />
                  <Route path="/popup" element={<Popup />} />
                  <Route path="*" element={<CustomTable />} />
              </Routes>
          </BrowserRouter>

  );
}

export default App;
