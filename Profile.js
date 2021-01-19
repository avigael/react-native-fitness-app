import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      calorieGoal: "",
      activityGoal: "",
    };
  }
  static navigationOptions = {
    title: "Profile",
  };

  async componentDidMount() {
    const username = this.props.navigation.state.params.username;
    let response = await fetch(
      "https://avigael-shop-fitness.herokuapp.com/users/" + username,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "x-access-token": this.props.navigation.state.params.token,
          Connection: "keep-alive",
          "cache-control": "no-cache",
        },
      }
    );
    response = await response.json();
    this.setState({
      username: response.username,
      firstName: response.firstName,
      lastName: response.lastName,
      calorieGoal: response.goalDailyCalories,
      activityGoal: response.goalDailyActivity,
    });
  }

  update = () => {
    fetch(
      "https://avigael-shop-fitness.herokuapp.com/users/" + this.state.username,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Connection: "keep-alive",
          "cache-control": "no-cache",
          "Content-Type": "application/json",
          "x-access-token": this.props.navigation.state.params.token,
        },
        body: JSON.stringify({
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          goalDailyCalories: this.state.calorieGoal,
          goalDailyActivity: this.state.activityGoal,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        alert(response.message);
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
      btn_shape: {
        backgroundColor: "rgba(99,206,237,1)",
        borderRadius: 10,
        width: "40%",
        height: 40,
        marginBottom: 15,
        justifyContent: "center",
      },
      btn_text: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>First Name</Text>
          <TextInput
            style={styles.input_placeholder}
            placeholder={"First name"}
            value={this.state.firstName}
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Last Name</Text>
          <TextInput
            style={styles.input_placeholder}
            placeholder={"Last name"}
            value={this.state.lastName}
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Calorie Goal</Text>
          <TextInput
            style={styles.input_placeholder}
            placeholder={"Set your calorie goal"}
            value={this.state.calorieGoal + ""}
            onChangeText={(text) => {
              this.setState({ calorieGoal: text });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Activity Goal</Text>
          <TextInput
            style={styles.input_placeholder}
            placeholder={"Set your activity goal"}
            value={this.state.activityGoal + ""}
            onChangeText={(text) => {
              this.setState({ activityGoal: text });
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.update()}
          style={styles.btn_shape}
        >
          <Text style={styles.btn_text}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={[styles.btn_shape, { backgroundColor: "red" }]}
        >
          <Text style={styles.btn_text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;
