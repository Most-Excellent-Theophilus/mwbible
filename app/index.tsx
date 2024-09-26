import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Chichewa_2014_Bible from "@/constants/Chewa_2014.json";

import { useRouter } from "expo-router";
import { useState, version } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { tintColorDark, tintColorLight } from "@/constants/Colors";
import { Book } from "@/constants/books";

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
          
          <TabBarIcon color='#4d2600' name="menu"  />
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
            <TabBarIcon name="book-outline" size={18} color='#4d2600'/>
            <ThemedText
              type="defaultSemiBold"
              style={{ textAlign: "center", paddingLeft: 10, paddingRight: 10 }}
            >
              {biblename}
            </ThemedText>
          
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderRadius: 5 }}>
          <TabBarIcon name="search" color='#4d2600' />
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
                  pathname: "/chapters" ,
                  params:  {
                    chapters: lastchapter,
                    book: item.bname,
                    version: biblename,
                    list: lastchapter == 1 ? [1]: chapterNumbers,
                    ilist: lastchapter == 1 ? '1': '2'
                  }
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
});
