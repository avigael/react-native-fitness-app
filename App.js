import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Today from "./Today.js";
import Profile from "./Profile.js";
import Exercise from "./Exercise.js";

const Navigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Today: { screen: Today },
  Profile: { screen: Profile },
  Exercise: { screen: Exercise },
});

const App = createAppContainer(Navigator);

export default App;