import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

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
    let activities = await fetch(
      "https://avigael-shop-fitness.herokuapp.com/activities",
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
    activities = await activities.json();
    this.setState({
      goalDailyActivity: response.goalDailyActivity,
      activities: activities.activities,
    });
  }

  async refresh() {
    this.setState({ goalDailyActivity: "", activities: [] });
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
    let activities = await fetch(
      "https://avigael-shop-fitness.herokuapp.com/activities",
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
            alignItems: "center",
            width: 340,
            height: 100,
            paddingTop: 8,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(230,230,230,1)",
              borderRadius: 15,
              padding: 15,
              width: "95%",
              height: "95%",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{x.name}</Text>
            <Text>{"Duration: " + x.duration + " min"}</Text>
            <Text>{"Calories: " + x.calories + " cal"}</Text>
          </View>
        </View>
      );
      activityTotal = activityTotal + x.duration;
    });
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      progress: {
        width: "95%",
        height: 125,
        marginTop: 15,
        alignItems: "center",
      },
      title_box: {
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 10,
        width: "95%",
        height: 40,
        justifyContent: "center",
      },
      title: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        alignSelf: "center",
      },
      progress_container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 20,
        justifyContent: "center",
      },
      progress_box: {
        backgroundColor: "rgba(213,218,223,1)",
        width: "40%",
        height: 55,
        borderRadius: 10,
        marginHorizontal: 25,
      },
      progress_title: {
        color: "#121212",
        alignSelf: "center",
        marginVertical: 4,
      },
      progress_value: {
        color: "#121212",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
      },
      exercise_container: {
        width: "95%",
        height: 400,
        alignItems: "center",
      },
      box: {
        backgroundColor: "rgba(213,218,223,1)",
        borderRadius: 10,
        width: "95%",
        height: 275,
        alignSelf: "center",
      },
      btn_box: {
        flexDirection: "row",
        width: "75%",
        justifyContent: "center",
      },
      btn_shape: {
        backgroundColor: "rgba(178,108,233,1)",
        borderRadius: 10,
        width: "50%",
        height: 40,
        marginTop: 10,
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
        <View style={styles.progress}>
          <View style={styles.title_box}>
            <Text style={styles.title}>Today's Progress! 🏃</Text>
          </View>
          <View style={styles.progress_container}>
            <View style={styles.progress_box}>
              <Text style={styles.progress_title}>Current Goal</Text>
              <Text style={styles.progress_value}>
                {this.state.goalDailyActivity + " min"}
              </Text>
            </View>
            <View style={styles.progress_box}>
              <Text style={styles.progress_title}>Current Total</Text>
              <Text style={styles.progress_value}>
                {activityTotal + " min"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.exercise_container}>
          <View
            style={[
              styles.title_box,
              { backgroundColor: "rgba(178,108,233,1)", marginVertical: 10 },
            ]}
          >
            <Text style={styles.title}>Today's Activity 🏋️</Text>
          </View>
          <ScrollView horizontal={false} style={styles.box}>
            <Text>{exercise}</Text>
          </ScrollView>
        </View>
        <View style={styles.btn_box}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Exercise", {
                username: this.props.navigation.state.params.username,
                token: this.props.navigation.state.params.token,
              });
            }}
            style={[styles.btn_shape, { marginHorizontal: 10 }]}
          >
            <Text style={styles.btn_text}>Add Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.refresh()}
            style={[
              styles.btn_shape,
              { backgroundColor: "rgba(153,50,245,1)", marginHorizontal: 10 },
            ]}
          >
            <Text style={styles.btn_text}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Profile", {
              username: this.props.navigation.state.params.username,
              token: this.props.navigation.state.params.token,
            })
          }
          style={[styles.btn_shape, { backgroundColor: "rgba(74,144,226,1)" }]}
        >
          <Text style={styles.btn_text}>View Profile</Text>
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

export default Today;
