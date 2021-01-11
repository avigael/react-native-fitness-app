import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import base64 from "base-64";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  static navigationOptions = {
    title: "Log In",
  };

  logIn = () => {
    fetch("https://avigael-shop-fitness.herokuapp.com/login", {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        Authorization: `Basic ${base64.encode(
          `${this.state.username}:${this.state.password}`
        )}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.token) {
          this.props.navigation.navigate("Today", {
            username: this.state.username,
            token: response.token,
          });
        } else alert("Username or Password is Incorrect!");
      });
  };

  signUp = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      login_box: {
        width: 350,
        height: 395,
        marginTop: 50,
        alignSelf: "center",
      },
      username_box: {
        width: 262,
        height: 43,
        position: "absolute",
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        top: 210,
        left: 0,
      },
      user_title: {
        color: "#121212",
        marginTop: -16,
      },
      username: {
        color: "#121212",
        marginTop: 14,
        marginLeft: 10,
      },
      icon: {
        top: 0,
        position: "absolute",
        color: "#121212",
        fontSize: 161,
        left: 51,
      },
      username_boxStack: {
        width: 262,
        height: 253,
        marginLeft: 44,
      },
      password_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 23,
        marginLeft: 0,
        alignSelf: "center",
      },
      pass_title: {
        color: "#121212",
        marginTop: -16,
      },
      password: {
        color: "#121212",
        marginTop: 14,
        marginLeft: 10,
      },
      button_box: {
        width: 223,
        height: 43,
        borderRadius: 10,
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 64,
      },
      login_btn: {
        width: 100,
        height: 43,
        backgroundColor: "rgba(99,206,237,1)",
        borderRadius: 10,
        alignSelf: "center",
      },
      signin: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        marginTop: 13,
        marginLeft: 27,
      },
      login_btnFiller: {
        flex: 1,
        flexDirection: "row",
      },
      signup_btn: {
        width: 100,
        height: 43,
        backgroundColor: "rgba(153,50,245,1)",
        borderRadius: 10,
        alignSelf: "center",
      },
      signUp: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        marginTop: 13,
        marginLeft: 26,
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.login_box}>
          <View style={styles.username_boxStack}>
            <View style={styles.username_box}>
              <Text style={styles.user_title}>Username</Text>
              <TextInput
                style={styles.username}
                autoCapitalize="none"
                placeholder="Username"
                onChangeText={(input) => {
                  this.setState({ username: input });
                }}
              />
            </View>
            <Text style={styles.icon}>🏃</Text>
          </View>
          <View style={styles.password_box}>
            <Text style={styles.pass_title}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.password}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={(input) => {
                this.setState({ password: input });
              }}
            />
          </View>
          <View style={styles.button_box}>
            <TouchableOpacity
              onPress={() => this.logIn()}
              style={styles.login_btn}
            >
              <Text style={styles.signin}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.login_btnFiller}></View>
            <TouchableOpacity
              onPress={() => this.signUp()}
              style={styles.signup_btn}
            >
              <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
