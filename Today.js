import * as React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalDailyActivity: "",
      activities: [],
    };
  }
  static navigationOptions = {
    title: "Today",
  };

  async componentDidMount() {
    const username = this.props.navigation.state.params.username;
    const token = this.props.navigation.state.params.token;
    let response = await fetch(
      "https://avigael-shop-fitness.herokuapp.com/users/" + username,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "x-access-token": token,
          Connection: "keep-alive",
          "cache-control": "no-cache",
        },
      }
    );

    response = await response.json();
    let activities = await fetch("https://avigael-shop-fitness.herokuapp.com/activities", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "x-access-token": token,
        Connection: "keep-alive",
        "cache-control": "no-cache",
      },
    });
    activities = await activities.json();
    this.setState({
      goalDailyActivity: response.goalDailyActivity,
      activities: activities.activities,
    });
  }

  render() {
    let exercise = [];
    let activityTotal = 0.0;
    const activities = this.state.activities;

    activities.forEach((x) => {
      exercise.push(
        <View
          key={x.id}
          style={{
            flexDirection: "row",
            paddingTop: 30,
            paddingLeft: 30,
          }}
        >
          <Text>{"Name: " + x.name + ", "}</Text>
          <Text>{"Duration: " + x.duration + " min, "}</Text>
          <Text>{"Calories: " + x.calories}</Text>
        </View>
      );
      activityTotal = activityTotal + x.duration;
    });
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      progress: {
        width: 350,
        height: 110,
        marginTop: 15,
        marginLeft: 13,
      },
      progress_title_box: {
        width: 350,
        height: 43,
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 10,
        justifyContent: "center",
      },
      title: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        alignSelf: "center",
      },
      progress_title_boxFiller: {
        flex: 1,
      },
      progress_boxes: {
        width: 325,
        height: 43,
        flexDirection: "row",
        marginLeft: 13,
      },
      goal_box: {
        width: 150,
        height: 43,
        borderRadius: 10,
        backgroundColor: "rgba(213,218,223,1)",
        alignSelf: "center",
      },
      goal_title: {
        color: "#121212",
        marginTop: -20,
        alignSelf: "center",
      },
      goal_value: {
        color: "#121212",
        fontSize: 20,
        marginTop: 13,
        alignSelf: "center",
      },
      goal_boxFiller: {
        flex: 1,
        flexDirection: "row",
      },
      current_box: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(213,218,223,1)",
        borderRadius: 10,
        alignSelf: "center",
      },
      current_title: {
        color: "#121212",
        marginTop: -21,
        alignSelf: "center",
      },
      current_value: {
        color: "#121212",
        fontSize: 20,
        marginTop: 14,
        alignSelf: "center",
      },
      exercise: {
        width: 350,
        height: 392,
        marginTop: 26,
        marginLeft: 13,
      },
      exercise_title_box: {
        width: 350,
        height: 43,
        backgroundColor: "rgba(178,108,233,1)",
        borderRadius: 10,
      },
      todaysActivity: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        marginTop: 6,
        alignSelf: "center",
      },
      box: {
        width: 350,
        height: 290,
        backgroundColor: "#E6E6E6",
        borderRadius: 10,
        flex: 1,
        marginBottom: -298,
        marginTop: 15,
        alignSelf: "center",
      },
      exercise_title_boxFiller: {
        flex: 1,
      },
      add: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(178,108,233,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginLeft: 0,
        alignSelf: "center",
      },
      addExercise: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        alignSelf: "center",
      },
      profile: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(74,150,226,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 24,
        marginLeft: 113,
      },
      viewProfile: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        alignSelf: "center",
      },
      logout: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(225,72,72,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 17,
        marginLeft: 113,
      },
      logOut: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        alignSelf: "center",
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <View style={styles.progress_title_box}>
            <Text style={styles.title}>Today's Progress! 🏃</Text>
          </View>
          <View style={styles.progress_title_boxFiller}></View>
          <View style={styles.progress_boxes}>
            <View style={styles.goal_box}>
              <Text style={styles.goal_title}>Current Goal</Text>
              <Text style={styles.goal_value}>
                {this.state.goalDailyActivity + " min"}
              </Text>
            </View>
            <View style={styles.goal_boxFiller}></View>
            <View style={styles.current_box}>
              <Text style={styles.current_title}>Current Total</Text>
              <Text style={styles.current_value}>{activityTotal + " min"}</Text>
            </View>
          </View>
        </View>
        <View style={styles.exercise}>
          <View style={styles.exercise_title_box}>
            <Text style={styles.todaysActivity}>Today's Activity 🏋️</Text>
            <View style={styles.box}>
              <Text>{exercise}</Text>
            </View>
          </View>
          <View style={styles.exercise_title_boxFiller}></View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Exercise", {
                username: this.props.navigation.state.params.username,
                token: this.props.navigation.state.params.token,
              });
            }}
            style={styles.add}
          >
            <Text style={styles.addExercise}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Profile", {
              username: this.props.navigation.state.params.username,
              token: this.props.navigation.state.params.token,
            })
          }
          style={styles.profile}
        >
          <Text style={styles.viewProfile}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.logout}
        >
          <Text style={styles.logOut}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Today;
