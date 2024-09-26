import ParallaxScrollView from "@/components/ParallaxScrollView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Chichewa_2014_Bible from "@/constants/Chewa_2014.json";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { tintColorDark, tintColorLight } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Looders from "@/components/Looders";

interface Verse {
  vnumber: string;
  text: string;
}
interface Chapter {
  cnumber: string;
  VERS: Verse[];
}

interface BibleBook {
  bnumber: string;
  bname: string;
  CHAPTERS: Chapter[];
}

interface BibleData {
  biblename: string;
  BIBLEBOOK: BibleBook[];
}

// Function to get verses for a specific book name and chapter number
function getVersesByBookAndChapter(
  bibleData: BibleData,
  bookName: string,
  chapterNumber: string | number,
  ilist: string
): Verse[] {
  let verses: Verse[] = [];

  bibleData.BIBLEBOOK.forEach((book) => {
    if (book.bname === bookName) {
      if (ilist === "1") {
        verses = book.CHAPTERS.VERS;
      } else {
        book.CHAPTERS.forEach((chapter) => {
          if (chapter.cnumber === chapterNumber) {
            verses = chapter.VERS; // Get the verses for this chapter
          }
        });
      }
    }
  });

  return verses;
}

export default function Verses() {
  const router = useRouter();

  const backgroundColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "text"
  );
  const { chapter, from, book, chapters, ilist } = useLocalSearchParams();
  const [bible, setBible] = useState(Chichewa_2014_Bible);
  const [verselist, setVerselist] = useState<Verse[]>([]);

  const [chap, setchap] = useState(chapter);

  function chapterDecrement() {
    if (chap === "1") {
      router.navigate({
        pathname: "/",
      });

    } else {
      const c = Number(chap) - 1;
      setchap("" + c + "");
    }
  }
  function chapterincrement() {
    if (chap == chapters) {
      router.navigate({
        pathname: "/",
      });
    } else {
      const c = Number(chap) + 1;
      setchap("" + c + "");
    }
  }

  useEffect(() => {
    setVerselist(getVersesByBookAndChapter(bible, book, chap, ilist));
  }, [chap]);
  // Specify the chapter number

  return (
    <>
      <ThemedView
        style={{
          paddingTop: 50,
          paddingLeft: 30,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: backgroundColor,
          paddingRight: 100,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            paddingBottom: 6,
            paddingRight: 10,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: backgroundColor,
          }}
          onPress={() => {
            router.navigate({
              pathname: "/",
            });
          }}
        >
          <TabBarIcon color="#4d2600" name="arrow-back" />
        </TouchableOpacity>

        <ThemedText
          type="title"
          style={{ paddingLeft: 6, alignSelf: "center" }}
        >
          {book} {chap}
        </ThemedText>
      </ThemedView>
      <ParallaxScrollView
        headerBackgroundColor={{ light: tintColorLight, dark: tintColorDark }}
      >
        {verselist.map((item) => {
          return (
            <ThemedView
              key={item.vnumber}
              style={{ width: "100%", flexDirection: "row" }}
            >
              <ThemedText
                type="link"
                style={{ marginHorizontal: 20, paddingTop: 8 }}
              >
                <ThemedText
                  type={item.vnumber !== "1" ? "subtitle" : "title"}
                  style={{ color: "#4d2600" }}
                >
                  {item.vnumber}
                </ThemedText>{" "}
                {item.text}
              </ThemedText>
            </ThemedView>
          );
        })}
      </ParallaxScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 60,
          height: 60,

          justifyContent: "center",
          alignItems: "center",
          right: -12,
          top: "50%",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
        }}
        onPress={() => chapterincrement()}
      >
        <TabBarIcon name="chevron-forward-outline" size={34} color="#4d2600" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 60,
          height: 60,

          justifyContent: "center",
          alignItems: "center",
          left: -12,
          top: "50%",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
        }}
        onPress={() => chapterDecrement()}
      >
        <TabBarIcon name="chevron-back-outline" size={34} color="#4d2600" />
      </TouchableOpacity>
    </>
  );
}
