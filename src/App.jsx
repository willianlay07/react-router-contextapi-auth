import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import IndividualPost from "./pages/IndividualPost";
import Login from "./pages/Login";
import PageNotFound from "./ui/PageNotFound";
import Profile from "./pages/Profile";
import { PostProvider } from "./context/PostProvider";
import { AuthProvider } from "./context/AuthProvider";

// const App = () => {
//   return (
//     <AuthProvider>
//       <PostProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route element={<AppLayout />}>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/posts" element={<Posts />} />
//               <Route path="/posts/:id" element={<IndividualPost />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/auth/profile" element={<Profile />} />
//               <Route path="*" element={<PageNotFound />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </PostProvider>
//     </AuthProvider>
//   );
// };

const App = () => {
  const ProvidersTree = buildProviderTree([[AuthProvider], [PostProvider]]);

  return (
    <ProvidersTree>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<IndividualPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/profile" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvidersTree>
  );
};

export default App;

const buildProviderTree = (componentsWithProps) => {
  const initialComponent = ({ children }) => <>{children}</>;

  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        );
      };
    },
    initialComponent
  );
};
