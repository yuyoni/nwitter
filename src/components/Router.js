import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// Switch -> Routes로 변경 : Routes는 포함된 Route들 중 하나만 보여준다.
// 더이상 exact는 안씀
// component -> element로 변경
// <Route path="/" element={<Home />} /> 이런식으로 작성해야 함
// Redirect -> Navigate로 변경

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "components/Profile";
import Navigation from "components/Navigation";

// (isLoggedIn) : 상위 컴포넌트에서 받은 프롭스를 구조 분해 할당으로 사용
const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
