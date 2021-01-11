import * as React from "react";
import {
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
      },
      login_box: {
        width: 350,
        height: 395,
        marginTop: 150,
        alignSelf: "center",
      },
      username_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 113,
        marginLeft: 44,
      },
      user_title: {
        color: "#121212",
        marginTop: -15,
      },
      username: {
        color: "#121212",
        marginTop: 13,
        marginLeft: 10,
      },
      password_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 18,
        marginLeft: 44,
      },
      pass_title: {
        color: "#121212",
        marginTop: -16,
      },
      password: {
        color: "#121212",
        marginLeft: 10,
      },
      pass_titleFiller: {
        flex: 1,
        justifyContent: "center",
      },
      button_box: {
        width: 223,
        height: 43,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 22,
        marginLeft: 64,
      },
      button2: {
        width: 100,
        height: 43,
        backgroundColor: "rgba(99,206,237,1)",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
      },
      submit: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        alignSelf: "center",
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.login_box}>
          <View style={styles.username_box}>
            <Text style={styles.user_title}>Username</Text>
            <TextInput
              style={styles.username}
              autoCapitalize="none"
              placeholder="Username"
              onChangeText={this.inputUsername}
            />
          </View>
          <View style={styles.password_box}>
            <Text style={styles.pass_title}>Password</Text>
            <View style={styles.pass_titleFiller}>
              <TextInput
                style={styles.password}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={this.inputPassword}
              />
            </View>
          </View>
          <View style={styles.button_box}>
            <TouchableOpacity
              onPress={() => this.submit()}
              style={styles.button2}
            >
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Signup;
