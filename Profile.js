import * as React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

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
    fetch("https://avigael-shop-fitness.herokuapp.com/users/" + this.state.username, {
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
    })
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
        justifyContent: "center",
      },
      box: {
        width: 339,
        height: 501,
        alignSelf: "center",
      },
      firstname_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 69,
        marginLeft: 38,
      },
      firstName: {
        color: "#121212",
        marginTop: -16,
      },
      firsthere: {
        color: "#121212",
        marginTop: 13,
        marginLeft: 15,
      },
      lastname_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      lastName: {
        color: "#121212",
        marginTop: -16,
      },
      lasthere: {
        color: "#121212",
        marginTop: 13,
        marginLeft: 15,
      },
      caloriegoal_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      calorieGoal: {
        color: "#121212",
        marginTop: -16,
      },
      calhere: {
        color: "#121212",
        marginTop: 13,
        marginLeft: 15,
      },
      activitygoal_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      activityGoal: {
        color: "#121212",
        marginTop: -16,
      },
      activityhere: {
        color: "#121212",
        marginTop: 13,
        marginLeft: 15,
      },
      button2: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 22,
        marginLeft: 94,
      },
      update: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        alignSelf: "center",
      },
      button: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(225,72,72,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 17,
        marginLeft: 94,
      },
      logOut: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        alignSelf: "center",
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.firstname_box}>
            <Text style={styles.firstName}>First Name</Text>
            <TextInput
              style={styles.firsthere}
              placeholder={"First name"}
              value={this.state.firstName}
              onChangeText={(text) => {
                this.setState({ firstName: text });
              }}
            />
          </View>
          <View style={styles.lastname_box}>
            <Text style={styles.lastName}>Last Name</Text>
            <TextInput
              style={styles.lasthere}
              placeholder={"Last name"}
              value={this.state.lastName}
              onChangeText={(text) => {
                this.setState({ lastName: text });
              }}
            />
          </View>
          <View style={styles.caloriegoal_box}>
            <Text style={styles.calorieGoal}>Calorie Goal</Text>
            <TextInput
              style={styles.calhere}
              placeholder={"Set your calorie goal"}
              value={this.state.calorieGoal + ""}
              onChangeText={(text) => {
                this.setState({ calorieGoal: text });
              }}
            />
          </View>
          <View style={styles.activitygoal_box}>
            <Text style={styles.activityGoal}>Activity Goal</Text>
            <TextInput
              style={styles.activityhere}
              placeholder={"Set your activity goal"}
              value={this.state.activityGoal + ""}
              onChangeText={(text) => {
                this.setState({ activityGoal: text });
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.update()}
            style={styles.button2}
          >
            <Text style={styles.update}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.logOut}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Profile;
