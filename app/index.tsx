import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
  View,
  Text,
  Button,
  Linking,
  Alert,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Chichewa_2014_Bible from "@/constants/Chewa_2014.json";

import { Link, useRouter } from "expo-router";
import { useState, version } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { tintColorDark, tintColorLight } from "@/constants/Colors";
import { Book } from "@/constants/books";
import Looders from "@/components/Looders";

export default function HomeScreen() {
  const router = useRouter();

  const [dropmenu, isOpen] = useState(false);
  const [biblename, setbiblename] = useState("Chichewa 2014");
  const [bible, setBible] = useState(Chichewa_2014_Bible);
  const backgroundColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "text"
  );

  return (
    <>
      <ThemedView
        style={[
          styles.titleContainer,
          { borderBottomWidth: 1, borderBottomColor: backgroundColor },
        ]}
      >
        <TouchableOpacity style={{ borderRadius: 5 }}>
          <TabBarIcon color="#4d2600" name="menu" />
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView
            style={{
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              padding: 5,
              borderColor: backgroundColor,
            }}
          >
            <TabBarIcon name="book-outline" size={18} color="#4d2600" />
            <ThemedText
              type="defaultSemiBold"
              style={{ textAlign: "center", paddingLeft: 10, paddingRight: 10 }}
            >
              {biblename}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: 5 }}>
          <TabBarIcon name="search" color="#4d2600" />
        </TouchableOpacity>
      </ThemedView>

      <ParallaxScrollView
        headerBackgroundColor={{ light: tintColorLight, dark: tintColorDark }}
      >
        {bible.BIBLEBOOK.map((item: Book) => {
          const chapters = item.CHAPTERS;

          var lastchapter = chapters.length;
          lastchapter === undefined ? (lastchapter = 1) : null;
          const chapterNumbers = Object.values(item.CHAPTERS).map(
            (chapter) => chapter.cnumber
          );
          // console.log()
          return (
            <TouchableOpacity
              key={item.bnumber}
              style={{
                width: "49%",
                borderWidth: 1,
                borderColor: backgroundColor,
                borderRadius: 6,
              }}
              onPress={() => {
                router.navigate({
                  pathname: "/chapters",
                  params: {
                    chapters: lastchapter,
                    book: item.bname,
                    version: biblename,
                    list: lastchapter == 1 ? [1] : chapterNumbers,
                    ilist: lastchapter == 1 ? "1" : "2",
                  },
                });
              }}
            >
              <ThemedView style={[styles.stepContainer]}>
                <ThemedText type="subtitle">{item.bname}</ThemedText>
                <ThemedText type="link">
                  {lastchapter} {lastchapter == 1 ? "Chapter" : "Chapters"}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          );
        })}
        <ThemedView style={{paddingTop:20}}>
          <Image
            source={require("../assets/images/adaptive-icon.png")} // Local image in the project
            style={styles.image}
          />
          <ThemedText type="defaultSemiBold" style={{alignSelf:'center'}}>mw bibles</ThemedText>

          <ThemedText  style={{ textAlign: "center", paddingTop: 20 }}>
            We aim to compile collections of as many native Malawian language bibles as possible, as of now we have one version under our belt, but we will soon have a Tumbuka and Yao bibles on our list.
          </ThemedText>
          <ThemedText  style={{ textAlign: "center", paddingTop: 20 }}>
            Note: Menu , Search , Version switching functionalities are still being tested, they will be delivered in the forthcoming releases. 
          </ThemedText>
          <ThemedText  type="defaultSemiBold"
                style={{
                  textAlign: "center", 
                  textDecorationLine: "underline",
                }}>
            Any form of is welcome and very much appreciated.
          </ThemedText>
          
          <ThemedText  style={{ textAlign: "center", paddingTop: 20 }}>
            Scripture quotations taken Chichewa 2014 version Copyright © 1992,
            2014 by Biblica, All rights reserved worldwide. . Used by
            permission. All rights reserved worldwide.
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{ paddingTop: 20, paddingBottom: 10 , textDecorationLine:'underline'}}
          >
            Contact us
          </ThemedText>
          <ThemedView>
            <TouchableOpacity
              onPress={() => openWhatsApp()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="logo-whatsapp" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                WhatsApp : +265 990 98 51 38
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => makeCall()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="call-outline" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                Call on : +265 884 83 40 71
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => makeCall2()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="call-outline" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                Call on : +265 887 11 70 71
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openEmail()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="mail-outline" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                email : mkamangasamuel255@gmail.com
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openEmail3()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="mail-outline" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                email : sammmkamanga@gmail.com
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openTelegram()}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 4,
                margin: 2,
              }}
            >
              <TabBarIcon name="send-outline" color={backgroundColor} />
              <ThemedText
                type="defaultSemiBold"
                style={{
                  paddingLeft: 10,
                  color: backgroundColor,
                  textDecorationLine: "underline",
                }}
              >
                Telegram : samuel mkamanga
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    paddingBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 5,
    borderRadius: 6,
    width: "99%",
  },
  dropdowncont: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const openEmail = () => {
  const email = "mkamangasamuel255@gmail.com";
  Linking.openURL(`mailto:${email}`).catch((err) =>
    Alert.alert("Error", "Unable to open email client")
  );
};

const openEmail3 = () => {
  const email = "sammmkamanga@gmail.com";
  Linking.openURL(`mailto:${email}`).catch((err) =>
    Alert.alert("Error", "Unable to open email client")
  );
};

const makeCall = () => {
  const phoneNumber = "+265884834071";
  Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
    Alert.alert("Error", "Unable to open phone dialer")
  );
};
const makeCall2 = () => {
  const phoneNumber = "+265887117071";
  Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
    Alert.alert("Error", "Unable to open phone dialer")
  );
};

const openWhatsApp = () => {
  const phoneNumber = "+265990985138"; // Include country code if required
  const message = "Hello! i was going throung the bible app";
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  Linking.openURL(url).catch(() =>
    Alert.alert("Error", "Make sure WhatsApp is installed on your device")
  );
};

const openTelegram = () => {
  const username = "+265884834071"; // You can use a username or phone number
  const url = `tg://resolve?domain=${username}`;

  Linking.openURL(url).catch(() =>
    Alert.alert("Error", "Make sure Telegram is installed on your device")
  );
};
