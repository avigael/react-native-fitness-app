import * as React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  static navigationOptions = {
    title: "Sign Up",
  };

  inputUsername = (text) => {
    this.setState({ username: text });
  };

  inputPassword = (text) => {
    this.setState({ password: text });
  };

  submit = () => {
    if (this.state.username === null || this.state.username === "") {
      alert("Please enter a username");
      return;
    }

    if (this.state.username.length < 5) {
      alert("Username too short. Must be at least 5 characters");
      return;
    }

    if (this.state.password === null || this.state.password === "") {
      alert("Please enter a password");
      return;
    }

    if (this.state.password.length < 5) {
      alert("Password too short. Must be at least 5 characters");
      return;
    }

    this.setState({ loading: true });

    fetch("https://avigael-shop-fitness.herokuapp.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => {
        this.setState({ loading: true });
        return response.json();
      })
      .then((response) => {
        if (response.message === "User created!") {
          alert(response.message);
          this.props.navigation.navigate("Login");
        } else {
          alert(response.message);
        }
      });
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Username</Text>
          <TextInput
            style={styles.input_placeholder}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={this.inputUsername}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Password</Text>
          <TextInput
            style={styles.input_placeholder}
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            placeholder="Password"
            onChangeText={this.inputPassword}
          />
        </View>
        <View style={styles.btn_box}>
          <TouchableOpacity
            onPress={() => this.submit()}
            style={styles.btn_shape}
          >
            <Text style={styles.btn_text}>Submit</Text>
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

export default Signup;
