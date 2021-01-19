import * as React from "react";
import {
  ActivityIndicator,
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
      loading: false,
    };
  }

  static navigationOptions = {
    title: "Log In",
  };

  logIn = () => {
    this.setState({ loading: true });
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
        this.setState({ loading: false });
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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      icon: {
        fontSize: 161,
        textAlign: "center",
        marginBottom: 25,
      },
      input_box: {
        width: "75%",
        height: 40,
        marginBottom: 25,
      },
      input_title: {
        color: "#121212",
        marginTop: -20,
      },
      input_placeholder: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        color: "#121212",
        backgroundColor: "rgba(230,230,230,1)",
      },
      btn_box: {
        flexDirection: "row",
        width: "75%",
        justifyContent: "center",
      },
      btn_shape: {
        backgroundColor: "rgba(99,206,237,1)",
        borderRadius: 10,
        width: "40%",
        height: 40,
        marginHorizontal: 5,
        justifyContent: "center",
      },
      btn_text: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
      },
      loading: {
        padding: 25,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.icon}>🏃</Text>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Username</Text>
          <TextInput
            style={styles.input_placeholder}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(input) => {
              this.setState({ username: input });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Password</Text>
          <TextInput
            secureTextEntry={true}
            autoCorrect={false}
            style={styles.input_placeholder}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(input) => {
              this.setState({ password: input });
            }}
          />
        </View>
        <View style={styles.btn_box}>
          <TouchableOpacity
            onPress={() => this.logIn()}
            style={styles.btn_shape}
          >
            <Text style={styles.btn_text}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.signUp()}
            style={[
              styles.btn_shape,
              { backgroundColor: "rgba(153,50,245,1)" },
            ]}
          >
            <Text style={styles.btn_text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator
          animating={this.state.loading}
          style={styles.loading}
          size="large"
        />
      </View>
    );
  }
}

export default Login;
