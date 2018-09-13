// tslint:disable
export const mockDB = 
[
  {
    title: "English Language Arts Specification: Grade 3 Claim 1",
    claimNumber: "C1",
    grades: 3,
    subject: "English Language Arts",
    shortCode: "E.G3.C1",
    target: [
      {
        title: "English Language Arts Specification: Grade 3 Claim 1 Target 1",
        shortCode: "E.G3.C1RL.T1",
        description: "Given an inference or conclusion, use explicit details and implicit information from the text to support the inference or conclusion provided.",
        standards: [
          {
            stdCode: "E.G3.C1RL.T1.RL.3.1",
            stdDesc: "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "CAT",
        clarification: "Students identify/select appropriate supporting text evidence for one or more GIVEN inferences or conclusions. The item stem must state an inference or conclusion drawn from the text, not merely paraphrase or quote words directly from the text.\r\n\r\nNote: in RL Target 4, students supply both the inference/conclusion AND the evidence.\r\n\r\nAll items are text-dependent. No item is answerable without reading the text.\r\n\r\nAll items should require students to cite specific textual evidence to support conclusions drawn from the text(s).",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student will identify text evidence (explicit details and/or implicit information) to support a GIVEN inference or conclusion based on the text."
        ],
        vocab: "NA",
        tools: "NA",
        stimInfo: "Stimuli are texts of literary fiction. Texts will include sufficient detail, both stated and implied, to allow for the formation of inferences or conclusions.\r\n\r\nRefer to Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications for more information on literary text types.",
        devNotes: "NA",
        complexity: "NA",
        dualText: "When a dual-text set contains one literary and one informational text, the literary text (text #1) is the primary focus, and the set of items must include items from the literary stimulus as well as items written across both texts. The informational text (text #2) must only be used as a foundational piece for the literary text, and no items can be written for only the informational text. If both texts are literary, items may be written to either or both. All dual-text stimuli sets should contain between 25-40% items written across both texts. \r\n\r\nWhen developing items from dual-text, Task Model 5 (short text constructed response-WR) should be written using the Appropriate Stems for Dual-Text Stimuli only to ensure students will have the opportunity to respond in writing to information from both texts.  Between 25-40% of all other items written in the dual-text set should be written across both texts. \r\n\r\nThe title of the each text should be included in the stem when more than one text is used.  Dual-text is considered long text.",
        accessibility: "string",
        stem: [
          {
            stemDesc: "-   Which [detail/sentence/line] from the passage **best** supports [provide inference or conclusion based on the passage]?\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?\r\n\r\n-   The reader can [infer/conclude] [provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the passage].\r\n    Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Which [detail/sentence/line] from [title text \\#1] **best** shows that [provide inference or conclusion based on both passages] is true of **both** passages? **NOTE:** This stem is only used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Which [detail/sentence/line] from [title text #1] **best** supports the same idea?",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          },
          {
            stemDesc: "-   Choose **two** [details/sentences/lines] from the passage that **best** support the [inference/conclusion] that [provide inference or conclusion based on the passage].\r\n\r\n-   Which [details/sentences/lines] from the passage **best** support [provide inference or conclusion based on the passage]? Choose **two** answers.\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Which  [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion]? Choose **two** answers.\r\n\r\n-   Read this [inference/conclusion].\r\n    [provide inference or conclusion based on the text]\r\n    Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Which [details/sentences/lines] from [text \\#1 name] **best** show that [provide inference or conclusion based on the two passages] is true of  **both** passages? Choose **two** answers.\r\n**NOTE:** This stem can only be used with two literary passages.\r\nBased on the information in [title text \\#2], [provide inference or conclusion based on passage \\#2]. Which [details/sentences/lines] from [text \\#1 name] **best** support the same idea? Choose **two** answers.",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          },
          {
            stemDesc: "-   Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion].\r\n[excerpted selectable text]\r\nThe [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Inference or conclusion based on the passage].\r\nClick the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the text].\r\n    Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs that **best** support this inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Both [title passage \\#1] and [title text \\#2] show [provide inference or conclusion based on both passages]. First, click the [detail/sentence/set of sentences/line in the paragraph] from [title text \\#1] that **best** supports [provide inference or conclusion]. Next, click on the [detail/sentence/set of sentences/line in the paragraph] from [title text #2] that also supports [provide inference or conclusion].\r\n[excerpted selectable text]\r\n**NOTE:** This stem can only be used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click the [detail/sentence/set of sentences/line/paragraph] from [title passage \\#1] that **best** supports the same idea.\r\n[excerpted selectable text]\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] from [title text \\#1] that **best** support the same idea.\r\n[excerpted selectable text]",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion.\r\n\r\nThe **answer choices** will present four options. Options that are paraphrased will be of similar structure. The correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.",
            examples: "NA",
            stimulus: "NA"
          },
          {
            taskName: "Task Model 2",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will prompt students to choose **two** answers. \r\n\r\nThe **answer choices** will present **five** or **six** options. Options that are paraphrased will be of similar structure. Of the options, there will be **two** correct answers.  Each correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.",
            examples: "NA",
            stimulus: "NA"
          },
          {
            taskName: "Task Model 3",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will indicate [one/two] options.\r\n\r\nThe **answer choices** will be selectable sentences, paragraphs, or sections from the text, or other selectable text. The text selection will be whole, continuous, and consecutive sections taken directly from the text, or other text provided. Sentences can be grouped into multi-sentence options. There will be **one or two** correct answers. The correct answer(s) will be the selectable sections of text that provide support for the given inference or conclusion. If there is more than one correct response, then the item stem will state the number of correct responses. The **distractors** will be other selectable sections of text that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.\r\n\r\n**NOTE:** If there are more than two defensible options (check every possibility), do not use this item type; use Multiple Choice (Task Model 1) or Multiple Select (Task Model 2).",
            examples: "**Format Example:**\r\n\r\n**The Format Example includes a sample of hot text from a grade 11 item and is included to provide guidance regarding *formatting purposes only*.**\r\n\r\nNote that selectable text is a whole, continuous section of text.\r\n\r\n__________________________________________________________________________\r\nThe reader can infer that Alice prefers warm weather over cold weather. Click on the line from the text that **best** supports this inference.\r\n\r\n[Ashley was sitting in the car rubbing her hands together as the deep white billowy smoke escaped from the exhaust pipe.] [I was certain the car would be warmed up, at least slightly, by the time I got in.] [I was sorely mistaken in my assumption.] [It was still just as ice-cold inside the car as it was outside in the snow.] [It actually seemed colder in the car because the heater was only thrusting cold air out of the vents.] [I looked at my sister and gave out a loud, forced shiver.] [I was shaking uncontrollably and couldn't stop my teeth from clicking against each other.] [\"Beautiful weather for a drive, eh?\" I said with a shaky grin.] [I think I finally knew what she meant when she said it was time to \"find the sun.\"]",
            stimulus: "NA"
          }
        ],
        rubrics: [
          "Correct response: 1 point; Incorrect response: 0 points",
          "All responses correct: 1 point; Any other response combination: 0 points",
          "All responses correct: 1 point; Any other response combination: 0 points"
        ]
      },
      {
        title: "English Language Arts Specification: Grade 3 Claim 1 Target 1",
        shortCode: "E.G3.C1RL.T1",
        description: "Given an inference or conclusion, use explicit details and implicit information from the text to support the inference or conclusion provided.",
        standards: [
          {
            stdCode: "E.G3.C1RL.T1.RL.3.1",
            stdDesc: "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "CAT",
        clarification: "Students identify/select appropriate supporting text evidence for one or more GIVEN inferences or conclusions. The item stem must state an inference or conclusion drawn from the text, not merely paraphrase or quote words directly from the text.\r\n\r\nNote: in RL Target 4, students supply both the inference/conclusion AND the evidence.\r\n\r\nAll items are text-dependent. No item is answerable without reading the text.\r\n\r\nAll items should require students to cite specific textual evidence to support conclusions drawn from the text(s).",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student will identify text evidence (explicit details and/or implicit information) to support a GIVEN inference or conclusion based on the text."
        ],
        vocab: "NA",
        tools: "NA",
        stimInfo: "Stimuli are texts of literary fiction. Texts will include sufficient detail, both stated and implied, to allow for the formation of inferences or conclusions.\r\n\r\nRefer to Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications for more information on literary text types.",
        devNotes: "NA",
        complexity: "NA",
        dualText: "When a dual-text set contains one literary and one informational text, the literary text (text #1) is the primary focus, and the set of items must include items from the literary stimulus as well as items written across both texts. The informational text (text #2) must only be used as a foundational piece for the literary text, and no items can be written for only the informational text. If both texts are literary, items may be written to either or both. All dual-text stimuli sets should contain between 25-40% items written across both texts. \r\n\r\nWhen developing items from dual-text, Task Model 5 (short text constructed response-WR) should be written using the Appropriate Stems for Dual-Text Stimuli only to ensure students will have the opportunity to respond in writing to information from both texts.  Between 25-40% of all other items written in the dual-text set should be written across both texts. \r\n\r\nThe title of the each text should be included in the stem when more than one text is used.  Dual-text is considered long text.",
        accessibility: "string",
        stem: [
          {
            stemDesc: "-   Which [detail/sentence/line] from the passage **best** supports [provide inference or conclusion based on the passage]?\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?\r\n\r\n-   The reader can [infer/conclude] [provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the passage].\r\n    Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Which [detail/sentence/line] from [title text \\#1] **best** shows that [provide inference or conclusion based on both passages] is true of **both** passages? **NOTE:** This stem is only used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Which [detail/sentence/line] from [title text #1] **best** supports the same idea?",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          },
          {
            stemDesc: "-   Choose **two** [details/sentences/lines] from the passage that **best** support the [inference/conclusion] that [provide inference or conclusion based on the passage].\r\n\r\n-   Which [details/sentences/lines] from the passage **best** support [provide inference or conclusion based on the passage]? Choose **two** answers.\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Which  [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion]? Choose **two** answers.\r\n\r\n-   Read this [inference/conclusion].\r\n    [provide inference or conclusion based on the text]\r\n    Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Which [details/sentences/lines] from [text \\#1 name] **best** show that [provide inference or conclusion based on the two passages] is true of  **both** passages? Choose **two** answers.\r\n**NOTE:** This stem can only be used with two literary passages.\r\nBased on the information in [title text \\#2], [provide inference or conclusion based on passage \\#2]. Which [details/sentences/lines] from [text \\#1 name] **best** support the same idea? Choose **two** answers.",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          },
          {
            stemDesc: "-   Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion].\r\n[excerpted selectable text]\r\nThe [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Inference or conclusion based on the passage].\r\nClick the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the text].\r\n    Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs that **best** support this inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "-   Both [title passage \\#1] and [title text \\#2] show [provide inference or conclusion based on both passages]. First, click the [detail/sentence/set of sentences/line in the paragraph] from [title text \\#1] that **best** supports [provide inference or conclusion]. Next, click on the [detail/sentence/set of sentences/line in the paragraph] from [title text #2] that also supports [provide inference or conclusion].\r\n[excerpted selectable text]\r\n**NOTE:** This stem can only be used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click the [detail/sentence/set of sentences/line/paragraph] from [title passage \\#1] that **best** supports the same idea.\r\n[excerpted selectable text]\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] from [title text \\#1] that **best** support the same idea.\r\n[excerpted selectable text]",
            shortStem: "Appropriate Stems for Dual-Text Stimuli"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion.\r\n\r\nThe **answer choices** will present four options. Options that are paraphrased will be of similar structure. The correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.",
            examples: "NA",
            stimulus: "NA"
          },
          {
            taskName: "Task Model 2",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will prompt students to choose **two** answers. \r\n\r\nThe **answer choices** will present **five** or **six** options. Options that are paraphrased will be of similar structure. Of the options, there will be **two** correct answers.  Each correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.",
            examples: "NA",
            stimulus: "NA"
          },
          {
            taskName: "Task Model 3",
            taskDesc: "The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will indicate [one/two] options.\r\n\r\nThe **answer choices** will be selectable sentences, paragraphs, or sections from the text, or other selectable text. The text selection will be whole, continuous, and consecutive sections taken directly from the text, or other text provided. Sentences can be grouped into multi-sentence options. There will be **one or two** correct answers. The correct answer(s) will be the selectable sections of text that provide support for the given inference or conclusion. If there is more than one correct response, then the item stem will state the number of correct responses. The **distractors** will be other selectable sections of text that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.\r\n\r\n**NOTE:** If there are more than two defensible options (check every possibility), do not use this item type; use Multiple Choice (Task Model 1) or Multiple Select (Task Model 2).",
            examples: "**Format Example:**\r\n\r\n**The Format Example includes a sample of hot text from a grade 11 item and is included to provide guidance regarding *formatting purposes only*.**\r\n\r\nNote that selectable text is a whole, continuous section of text.\r\n\r\n__________________________________________________________________________\r\nThe reader can infer that Alice prefers warm weather over cold weather. Click on the line from the text that **best** supports this inference.\r\n\r\n[Ashley was sitting in the car rubbing her hands together as the deep white billowy smoke escaped from the exhaust pipe.] [I was certain the car would be warmed up, at least slightly, by the time I got in.] [I was sorely mistaken in my assumption.] [It was still just as ice-cold inside the car as it was outside in the snow.] [It actually seemed colder in the car because the heater was only thrusting cold air out of the vents.] [I looked at my sister and gave out a loud, forced shiver.] [I was shaking uncontrollably and couldn't stop my teeth from clicking against each other.] [\"Beautiful weather for a drive, eh?\" I said with a shaky grin.] [I think I finally knew what she meant when she said it was time to \"find the sun.\"]",
            stimulus: "NA"
          }
        ],
        rubrics: [
          "Correct response: 1 point; Incorrect response: 0 points",
          "All responses correct: 1 point; Any other response combination: 0 points",
          "All responses correct: 1 point; Any other response combination: 0 points"
        ]
      }
    ]
  },
  {
    title: "English Language Arts Performance Task Specification: Grade 5 Informational Writing",
    claimNumber: "5Informational Writing",
    grades: [
      "05",
      "06"
    ],
    subject: "English Language Arts",
    shortCode: "E.G05,06.5Informational Writing",
    target: [
      {
        title: "English Language Arts Performance Task Specification: Grade 5 Informational Writing",
        shortCode: "E.G5.C4R.T4",
        description: "Cite evidence to support opinions, ideas, or analyses.",
        standards: [
          {
            stdCode: "E.G5.C1RI.T8.RI.5.1",
            stdDesc: "Quote accurately from a text when explaining what the text says explicitly and when drawing inferences from the text."
          },
          {
            stdCode: "E.G5.C1RI.T8.RI.5.7",
            stdDesc: "Draw on information from multiple print or digital sources, demonstrating the ability to locate an answer to a question quickly or to solve a problem efficiently."
          },
          {
            stdCode: "E.G5.C1RI.T11.RI.5.6",
            stdDesc: "Analyze multiple accounts of the same event or topic, noting important similarities and differences in the point of view they represent."
          },
          {
            stdCode: "E.G5.C1RI.T11.RI.5.9",
            stdDesc: "Integrate information from several texts on the same topic in order to write or speak about the subject knowledgeably."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.4",
            stdDesc: "Produce clear and coherent writing in which the development and organization are appropriate to task, purpose, and audience."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.5",
            stdDesc: "With guidance and support from peers and adults, develop and strengthen writing as needed by planning, revising, editing, rewriting, or trying a new approach."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.8",
            stdDesc: "Recall relevant information from experiences or gather relevant information from print and digital sources; summarize or paraphrase information in notes and finished work, and provide a list of sources."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.9",
            stdDesc: "Draw evidence from literary or informational texts to support analysis, reflection, and research."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2a",
            stdDesc: "Introduce a topic clearly, provide a general observation and group related information logically; include formatting (e.g., headings), illustrations, and multimedia when useful to aiding comprehension."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2b",
            stdDesc: "Develop the topic with facts, definitions, concrete details, quotations, or other information and examples related to the topic."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2c",
            stdDesc: "Link ideas within and across categories of information using words, phrases, and clauses (e.g., *in contrast, especially*)."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2d",
            stdDesc: "Use precise language and domain-specific vocabulary to inform about or explain the topic."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2e",
            stdDesc: "Provide a concluding statement or section related to the information or explanation presented."
          },
          {
            stdCode: "E.G5.C2WO.T6a.W.5.1b",
            stdDesc: "Provide logically ordered reasons that are supported by facts and details."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "PT",
        clarification: "-   Performance Task (PT): In general, the PT should allow students to demonstrate deeper thinking and allow more integration of information from resources. Sources should cover the subject sufficiently enough to allow students to develop a main idea, but not be too general.\r\n\r\n-   Choosing Sources: Overall, the sources should offer more factual information and citations than just unsupported opinions. Stories or other works of fiction are not appropriate for the Grade 3–5 research tasks. Do not use literary fiction in the Grade 3-5 tasks.\r\n\r\n-   Each performance task (PT) should be as unique as possible. Within a PT set, stimuli may, however, be used in more than one PT if necessary and important to the task. This must be done cautiously and to a limited extent only. There should be different companion stimuli and, in addition, the two PTs must not have the same focus. Choose sources with writing assignment in mind. Think about writing assignment and whether sources provide enough information for an appropriate informational full write. Try not to create a writing assignment around a set of sources – the writing purpose **should come from the sources** and not be a forced fit.\r\n\r\n-   Claim 4 Targets: Target 2 will focus on choosing text and visual elements that support a research central idea, key detail, and/or given purpose as well as the integration of notes into a central idea or key detail category. Target 3 will focus on analyzing sources in order to locate additional information, such as relevant sources of information and relevant information from visual elements that will enhance an existing piece of student writing. Target 4 will focus on using/selecting evidence to support an opinion, idea, or analysis.\r\n\r\n-   Research Questions: The three research questions must represent at least two different Claim 4 targets. Within a PT set, an item task model for a research question (RQ) can be used across PTs.",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student will locate information from multiple sources to support a central idea or subtopic related to research.",
          "The student will write full informational texts on a topic using a complete writing process attending to purpose and audience: organize ideas by stating a focus (main idea); include text structures and appropriate transitional strategies for coherence; include elaboration and supporting evidence from sources; and develop an appropriate conclusion related to the information or explanation presented.",
          "The student will analyze digital and print sources in order to locate relevant information to support research.",
          "The student will select evidence to support opinions, ideas, or analyses based on evidence collected and analyzed.",
          "The student will integrate information from multiple text sources to support a given purpose related to research tasks."
        ],
        vocab: "string",
        tools: "Word processing tools including spell check",
        stimInfo: "**Informational and literary nonfiction texts:** Includes the subgenres of articles, essays, memoirs, speeches, interviews, primary and secondary accounts, how-to articles, and functional reading.\r\n\r\n-   Stimuli should include information about the sources (including in-text citations for opinions) that aids the student in assessing the relevance or usefulness of the information presented in the sources.\r\n\r\n-   Stimuli should be presented as a set of sources that students might authentically find through a search, in alignment with the context of the writing assignment. Stimuli for research (three for Grade 5) should have some references and footnotes/in-text citations resembling authentic research sources.\r\n\r\n-   The set of sources should provide enough evidence that allows students to establish and support a main idea, rather than simply restating the ideas within the sources. Sources should not be encyclopedic or too general.\r\n\r\n-   The set of sources should together provide a comprehensive and richer collection of information than any one source alone and should encourage integration of information. Sources need some overlap of ideas to allow for analysis across texts.\r\n\r\n-   Overall, the sources should offer more factual information and citations than just unsupported opinions.\r\n\r\n**Literary fiction texts:** Includes the subgenres of narrative fiction, short stories, poetry, and song lyrics.\r\n\r\n-   Stories or other works of fiction are not appropriate for the Grade 3–5 research tasks. Do not use literary fiction in Grade 3–5 tasks.\r\n\r\nVisual/graphic sources: Includes the subgenres of data tables and graphs, maps, info-graphics, timelines, diagrams, photographs, drawings, and artwork.\r\n\r\n-   In any set of textual stimuli for research, visual/graphic sources that are included within the stimuli must serve a purpose other than to simply break up the text (e.g., making an abstract concept, idea, or process described in the source more understandable, providing additional information relevant to understanding the topic or subtopic). They should be highly relevant to the topic or subtopic of the source and not introduce distracting or irrelevant information.\r\n\r\n-   Visuals should not be so complicated that they add to the reading load.\r\n\r\n-   Care should be taken in the selection of visual/graphic sources in consideration of accessibility issues for students with visual impairments. However, not ALL tasks must be accessible for visually impaired students.\r\n\r\n-   If a PT uses the maximum number of sources allowed for a PT (three for Grade 5), one source may be a visual/graphic source in itself.",
        devNotes: "When there is more than one DOK listed, DOK 3 is for machine-scored items and DOK 4 is for short-text items.",
        complexity: "PT stimuli should follow the guidelines in the stimulus specifications document: Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications; however, the complexity of the stimuli, taken as a whole, should be at approximately the lower end of the target grade level. The vocabulary used in the stimulus and the item should be on or below grade level. In some instances, vocabulary may be above grade level as long as the stimulus has sufficient context to support the meaning of the word. In other cases, a complex authentic source that is at a reading level above the target grade (e.g., a historical primary source document) may be included, but these should be used with caution and with appropriate supports (e.g., historical context, definitions of key terms).",
        dualText: "NA",
        accessibility: "string",
        stem: [
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus\r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 discusses &#60topic&#62. Explain how the information in Source \\#2 adds to the reader’s understanding of &#60topic&#62. Give **two** [details/examples] from Source \\#2 to support your explanation.\r\n\r\n-   Source \\#1 and Source \\#3 discuss &#60topic&#62. Explain what the sources say about &#60topic&#62. Use **two** details, one detail from Source \\#1 and one detail from Source \\#3, to support your explanation. For each detail, include the source title or number.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 includes information about &#60topic&#62. Explain how this information would be helpful if it were added to Source \\#2. Give **two** [details/examples] from Source \\#2 to support your explanation.\r\n\r\n-   Source \\#1 and Source \\#2 discuss &#60topic&#62. What does Source \\#1 explain about &#60topic&#62 that Source \\#2 does not? Explain why that information is helpful for the reader. Give **two** [details/examples] from Source \\#1 to support your explanation.\r\n\r\n-   Source \\#1 includes a [chart/graph/photograph]. Explain how this [chart/graph/photograph] would be helpful if it were added to Source \\#2. Give **two** [details/examples] from Source \\#2 to support your explanation.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus\r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 gives information about &#60topic&#62. Choose [**two**/**three**] [facts/ideas/details] from Source \\#2 that give **different** information about &#60topic&#62.\r\n\r\n-   Choose [**two**/**three**] [details/ideas] that explain what **both** Source \\#1 and Source \\#2 say about &#60topic&#62.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Which source is **most** helpful in understanding &#60idea/process&#62? Explain why this source is **most** helpful. Give **two** [details/examples] from the source to support your explanation.\r\n\r\n-   Which source has the **most** useful information about &#60topic&#62? Explain why this source has the **most** useful information about &#60topic&#62. Give **two** [details/examples] from the source to support your explanation.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stem:**\r\n- Which source has the **most** useful information about &#60topic&#62? Choose **one** answer that gives the source number and correctly explains why this is the **most** useful source.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Explain [why/how] &#60idea/opinion&#62. Give **two** [reasons/details/examples], one [reason/detail/example] from Source \\#1 and one [reason/detail/example] from Source \\#2, to support your explanation. For each [reason/detail/example], include the source title or number.\r\n\r\n-   Explain what would happen if &#60possible effect from cause discussed in sources&#62. Give at least **two** [details/examples], one [detail/example] from Source \\#1 and one [detail/example] from Source \\#2, to support your explanation. For each [detail/example], include the source title or number.\r\n\r\n-   Each source explains &#60topic/information&#62. Explain why this [topic/information] is important. Give **two** examples, one example from Source \\#1 and one example from Source \\#2, to support your explanation. For each example, include the source title or number.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Click on the boxes to match each source with the [idea/opinion] that it supports. Some [ideas/opinions] may have more than one source selected.\r\n\r\n   **Example of Formatting:**\r\n\r\n|   | Source #1: [title] |  Source #2: [title] |  Source #3: [title] |\r\n|---|--------|--------|--------|\r\n| [idea/opinion] _____________   |  |   |   |\r\n| [idea/opinion]_____________   |  |   |   |\r\n $~$ \r\n\r\n \r\n-   Look at the [ideas/opinions] in the table. Decide if the information in Source #1, Source #2, both sources, or neither source supports each [idea/opinion]. Click on the box to match the source that supports each [idea/opinion]. There will be only one box selected for each [idea/opinion]. \r\n\r\n**Example of Formatting:**\r\n\r\n\r\n\r\n|  |  Source #1: [title] |  Source #2: [title] |  Both  |  Neither  | \r\n|------------------|---|---|---|---|\r\n| [idea/opinion] |   |   |   |   |  \r\n| [idea/opinion] |   |   |   |   |  \r\n| [idea/opinion] |   |   |   |   |  \r\n$~$\r\n\r\n**Clarifications:** Matching tables should have no more than three correct answers at this grade level. If there are too many defensible options (check every possibility) do not use this item type, use multiple-choice.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "NA",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** G5.T2. Excerpt from one of the Sources \r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 says &#60quote&#62. Click on [**one**/**two**/**three**] sentence(s) in Source \\#2 below that support this [idea/detail].\r\n\r\n**Clarifications:** The stem should appear above the excerpt, not after it.",
            shortStem: "Appropriate Stems"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1",
            taskDesc: "NA",
            examples: "NA",
            stimulus: "string"
          },
          {
            taskName: "Task Model 3",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 4",
            taskDesc: "The student will locate sentences from a source presented in the performance task that provide different information from/supporting information to the information presented in another source from the performance task.\r\n\r\nThe **answer choices** should be six to eight sentences from a source presented in the performance task; however, regardless of the number of answer options and correct responses, the correct responses must equal less than half of the total answer options. To avoid clueing, the topic that is stated in the stem should either not use the explicit wording of the answer choices, or contain a balance of wording across the answer choices. To avoid outliers, be sure that the answer choices are about the same length, staggered evenly, or that a balance of length is used (e.g., three short, three long). Order the choices from shortest to longest.\r\n\r\nThe **correct answer choices** should be sentences that clearly provide differing information from/supporting information to the information given about the topic from the source mentioned in the stem.\r\n\r\n**Distractors** are the sentences that should reflect common student errors. Plausible distractors for this model might include (1) sentences that are on topic but do not provide differing information from the information presented in the source that is mentioned in the stem and/or (2) sentences that are interesting facts but do not provide differing information from the information presented in the source that is mentioned in the stem.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 5",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 6",
            taskDesc: "The student will locate the source description that provides the most useful information about a topic given in the stem.\r\n\r\nThe **answer choices** should be source titles, numbers, and descriptions of the sources that are provided in the performance task. To avoid clueing, be sure that the answer choices do not contain wording from the topic mentioned in the stem, or contain a balance of wording across the options. To avoid outliers, be sure that the answer choices are about the same length, staggered evenly, or that a balance of length is used (i.e., two short, two long). Order the choices from shortest to longest.\r\n\r\nThe **correct answer choice** should be one source description that is correct and provides the most useful information on the topic mentioned in the stem.\r\n\r\n**Distractors** are the sentences that should reflect common student errors. \r\n\r\n**Plausible distractors** for this model might include (1) a source that is inaccurate and/or (2) a source that contains opinions or speculation and/or 3) information from the source that is not useful for the topic.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 7",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 8",
            taskDesc: "The student will match ideas/opinions to a source number and title. To avoid clueing, do not use the same wording in the idea/opinion as is used in the sources. The student should not be able to match the idea/opinion to the source that supports it by simply matching the wording used.\r\n\r\nThe **correct answer choices** should fit clearly into one category listed in the table. If there are too many defensible options (check every possibility) do not use this item type, use multiple-choice.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 9",
            taskDesc: "Create an informational writing assignment that flows naturally from the research scenario given in the Student Directions (see “Task Description” above). An informational assignment must provide the following information:\r\n\r\n-   A purpose for writing\r\n\r\n-   A description of the audience\r\n\r\n-   A clear direction to write a main idea supported by details from the sources",
            examples: "NA"
          },
          {
            taskName: "Task Model 2",
            taskDesc: "**Presenting the Sources:** The sources should not be presented with \"Read this story/article/letter to the editor.\" Students need to initially skim the sources with a purpose, be able to see the questions they will need to answer, and then go back and read the sources more carefully to find the answers.\r\n\r\n**Sample Setup #1:** “As part of your research you have found three sources. \r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Sample Setup #2:** “You decide to look up more information about this topic. You have found three sources about this topic.\r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Sample Setup #3:** “Your teacher takes your class to the library to look up more information. You have found three sources about this topic.\r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Task Description:** The Student Directions should include a motivating setup for every task that provides a paragraph/scenario explaining in an engaging way the issue the student will be researching. The setup places the student in a role to complete a particular task related to the issue. This should be done by establishing the reason for and nature of the research to be done without giving away the final assignment (see examples below in Sample Assignments). The actual assignment for the full write will appear later when it is time to start that task, but the role and issue will allow the student to read with a purpose and a frame of reference.\r\n\r\nThe performance task provides two short-text items and one machine-scored item on Claim 4 Targets 2, 3, and 4 and one Claim 2 Target 4 informational full write. The three Claim 4 items should build toward the full write by increasing the students’ interaction with the sources in preparation for addressing the research demands of the full write.\r\n\r\nIn the informational full write, the student will draw relevant ideas and information from the sources, answering the “what” about the topic, elaborating when necessary, and maintaining a clear focus throughout. Students should reference the sources used when integrating relevant information in their writing. The student will address a specific audience and purpose in the full write.\r\n\r\nAfter drafting the full write, the student will revise and edit, paying attention to clarity and accuracy as well as to language conventions (e.g., grade-appropriate grammar usage, spelling, capitalization, and punctuation).",
            examples: "Your teacher is creating a bulletin board display in the school library to show what your class has learned about different kinds of jobs. You decide to write an informational article on astronauts. Your article will be read by other students, teachers, and parents.\r\n\r\nUsing more than one source, develop a main idea about being an astronaut. Choose the most important information from the sources to support your main idea. Then, write an informational article that is several paragraphs long. Clearly organize your article and support your main idea with details from the sources. Use your own words except when quoting directly from the sources. Be sure to give the source title or number when using details from the sources."
          }
        ],
        rubrics: [
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by two [details/examples] from Source #2.",
          "Rubric 1a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by two vague or loosely related [details/examples] from Source #2. \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an adequate evidence-based explanation of &#60topic&#62 supported by two details, one from Source #1 and one from Source #3.  Student cites the source for each detail.",
          "Rubric 1b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of &#60topic&#62 supported by two vague or loosely related details, one from Source #1 and one from Source #3.  Student cites the source for each detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by two details from either Source #1 or Source #3.  Student cites the source for each detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by one detail from either Source #1 or Source #3.  Student cites the source for the detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by two details, one from Source #1 and one from Source #3.  Student does not cite the source for each detail.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by two [details/examples] from Source #2.",
          "Rubric 3a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by two vague or loosely related [details/examples] from Source #2.  \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and an adequate evidence-based explanation of why that information is helpful for the reader supported by two [details/examples] from Source #1.",
          "Rubric 3b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and a limited/partial evidence-based explanation of why that information is helpful for the reader supported by two vague or loosely related [details/examples] from Source #1.  \r\n**OR**\r\nResponse is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and an adequate evidence-based explanation of why that information is helpful for the reader supported by one [detail/example] from Source #1.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "Response is an identification of which source is most helpful  in understanding &#60idea/process&#62 and an adequate evidence-based explanation of why it is  most helpful in understanding  &#60idea/process&#62, supported by two [details/examples] from the identified source.",
          "Rubric 5a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of which source is most helpful in understanding &#60idea/process&#62 and a limited/partial evidence-based explanation of why it is most helpful in understanding  &#60idea/process&#62, supported by two vague or loosely related [details/examples] from the identified source.  \r\n**OR**\r\nResponse is an identification of which source is most helpful in understanding &#60idea/process&#62 and an adequate evidence-based explanation of why it is most helpful in understanding &#60idea/process&#62, supported by one [detail/example] from the identified source.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.  Just identifying the source is insufficient.",
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student cites the source for each [reason/detail/example].",
          "Rubric 7a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two vague or loosely related [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student cites the source for each [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples] from one source.  Student cites the source for each [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by one [reason/detail/example] from one source.  Student cites the source for the [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student does not cite the source for each [reason/detail/example].",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student cites the source for each [detail/example].",
          "Rubric 7b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two vague or loosely related [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student cites the source for each [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples] from one source.  Student cites the source for each [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by one [detail/example] from one source.  Student cites the source for the [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student does not cite the source for each [detail/example].",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "**Sample Informational Scoring:**\r\n\r\n**REMEMBER: A well-written informational &#60type of assignment&#62**\r\n\r\n-   has a clear main idea\r\n\r\n-   is well organized and stays on topic\r\n\r\n-   has an introduction and conclusion\r\n\r\n-   uses transitions\r\n\r\n-   uses details from the sources to support your main idea\r\n\r\n-   puts the information from the sources in your own words, except when using direct quotations from the sources\r\n\r\n-   gives the title or number of the source for the details or facts you included\r\n\r\n-   develops ideas clearly\r\n\r\n-   uses clear language\r\n\r\n-   follows rules of writing (spelling, punctuation, and grammar usage)\r\n\r\n**Scoring Rules for the Performance Task:**\r\n\r\n2-point rubric for hand-scored research question responses\r\n\r\n10-point analytic rubric for full write (4 points for organization/purpose; 4 points for evidence/elaboration; 2 points for conventions)",
          "**The response has a clear and effective organizational structure, creating a sense of unity and completeness. The organization is sustained between and within paragraphs. The response is consistently and purposefully focused:**\r\n\r\n-\tcontrolling/main idea of a topic is clearly communicated, and the focus is strongly maintained for the purpose and audience\r\n\r\n-\tconsistent use of a variety of transitional strategies to clarify the relationships between and among ideas\r\n\r\n-\teffective introduction and conclusion\r\n\r\n-\tlogical progression of ideas from beginning to end; strong connections between and among ideas with some syntactic variety",
          "Rubric 9 - Organization/Purpose",
          "**The response has an evident organizational structure and a sense of completeness. Though there may be minor flaws, they do not interfere with the overall coherence. The organization is adequately sustained between and within paragraphs. The response is generally focused:**\r\n\r\n- controlling/main idea of a topic is clear, and the focus is mostly maintained for the purpose and audience\r\n\r\n- adequate use of transitional strategies with some variety to clarify the relationships between and among ideas\r\n\r\n- adequate introduction and conclusion\r\n\r\n- adequate progression of ideas from beginning to end; adequate connections between and among ideas",
          "**The response has an inconsistent organizational structure. Some flaws are evident, and some ideas may be loosely connected. The organization is somewhat sustained between and within paragraphs. The response may have a minor drift in focus:**\r\n\r\n-\tcontrolling/main idea of a topic may be somewhat unclear, or the focus may be insufficiently sustained for the purpose and/or audience\r\n\r\n-\tinconsistent use of transitional strategies and/or little variety\r\n\r\n-\tintroduction or conclusion, if present, may be weak\r\n\r\n-\tuneven progression of ideas from beginning to end; and/or formulaic; inconsistent or unclear connections between and among ideas",
          "The response has little or no discernible organizational structure. The response may be related to the topic but may provide little or no focus:\r\n\r\n- controlling/main idea may be confusing or ambiguous; response may be too brief or the focus may drift from the purpose and/or audience\r\n\r\n- few or no transitional strategies are evident\r\n\r\n- introduction and/or conclusion may be missing\r\n\r\n- frequent extraneous ideas may be evident; ideas may\r\nbe randomly ordered or have an unclear progression",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "NA",
          "**The response provides adequate elaboration of the support/evidence for the controlling/main idea that includes the use of source material. The response adequately develops ideas, employing a mix of precise and more general language:**\r\n\r\n-\tadequate evidence (facts and details) from the source material is integrated and relevant, yet may be general\r\n\r\n-\tadequate use of citations or attribution to source material\r\n\r\n-\tadequate use of some elaborative techniques [1]\r\n\r\n-\tvocabulary is generally appropriate for the audience and purpose\r\n\r\n-\tgenerally appropriate style is evident\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "Rubric 9 - Evidence/Elaboration",
          "**The response provides uneven, cursory elaboration of the support/evidence for the controlling/main idea that includes uneven or limited use of source material. The response develops ideas unevenly, using simplistic language:**\r\n\r\n-\tsome evidence (facts and details) from the source material may be weakly integrated, imprecise, repetitive, vague, and/or copied\r\n\r\n-\tweak use of citations or attribution to source material\r\n\r\n-\tweak or uneven use of elaborative techniques [1]; development may consist primarily of source summary\r\n\r\n-\tvocabulary use is uneven or somewhat ineffective for the audience and purpose\r\n\r\n-\tinconsistent or weak attempt to create appropriate style\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "**The response provides minimal elaboration of the support/evidence for the controlling/main idea that includes little or no use of source material. The response is vague, lacks clarity, or is confusing:**\r\n\r\n-\tevidence (facts and details) from the source material is minimal, irrelevant, absent, incorrectly used, or predominantly copied\r\n\r\n-\tinsufficient use of citations or attribution to source material\r\n\r\n-\tminimal, if any, use of elaborative techniques [1]\r\n\r\n-\tvocabulary is limited or ineffective for the audience and purpose\r\n\r\n-\tlittle or no evidence of appropriate style\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "NA",
          "**The response provides thorough elaboration of the support/evidence for the controlling/main idea that includes the effective use of source material. The response clearly and effectively develops ideas, using precise language:**\r\n\r\n-\tcomprehensive evidence (facts and details) from the source material is integrated, relevant, and specific\r\n\r\n-\tclear citations or attribution to source material\r\n\r\n-\teffective use of a variety of elaborative techniques [1]\r\n\r\n-\tvocabulary is clearly appropriate for the audience and purpose\r\n\r\n-\teffective, appropriate style enhances content\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "**The response demonstrates an adequate command of conventions:**\r\n\r\n-\tadequate use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "Rubric 9 - Conventions",
          "**The response demonstrates a partial command of conventions:**\r\n\r\n-\tlimited use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "**Holistic Scoring:**\r\n\r\n-\tVariety: A range of errors includes sentence formation, punctuation, capitalization, grammar usage, and spelling.\r\n-\tSeverity: Basic errors are more heavily weighted than higher-level errors.\r\n-\tDensity: The proportion of errors to the amount of writing done well. This includes the ratio of errors to the length of the piece.",
          "**The response demonstrates little or no command of conventions:**\r\n\r\n-\tinfrequent use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "Rubric 3c",
          "Response is an adequate evidence-based explanation of how the [chart/graph/photograph] in Source #1 would be helpful if it were added to Source #2 supported by two [details/examples] from Source #2.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how the [chart/graph/photograph] in Source #1 would be helpful if it were added to #2 supported by two vague or loosely related [details/examples] from Source #2.  \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how the [chart/table/photograph] in Source #1 would be helpful if it were added to Source #2 supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Rubric 5b",
          "Response is an identification of which source has the most useful information about &#60topic&#62 and an adequate evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by two [details/examples] from the identified source.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of which source has the most useful information about &#60topic&#62 and a limited or partial evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by two vague or loosely related [details/examples] from the identified source.  \r\n**OR**\r\nResponse is an identification of which source has the most useful information about &#60topic&#62 and an adequate evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by one [detail/example] from the identified source.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.  Just identifying the source is insufficient.",
          "Rubric 7c",
          "Response is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples, one example from Source #1 and one example from Source #2.  Student cites the source for each example.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of  why &#60topic/information&#62 is important supported by two vague or loosely related examples, one example from Source #1 and one example  from Source #2.  Student cites the source for each example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples from one source.  Student cites the source for each example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by one example from one source.  Student cites the source for the example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples, one example from Source #1 and one example from Source #2.  Student does not cite the source for each example.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "NA",
          "NA",
          "NA",
          "NA"
        ]
      },
      {
        title: "English Language Arts Performance Task Specification: Grade 5 Informational Writing",
        shortCode: "E.G5.C4R.T4",
        description: "Cite evidence to support opinions, ideas, or analyses.",
        standards: [
          {
            stdCode: "E.G5.C1RI.T8.RI.5.1",
            stdDesc: "Quote accurately from a text when explaining what the text says explicitly and when drawing inferences from the text."
          },
          {
            stdCode: "E.G5.C1RI.T8.RI.5.7",
            stdDesc: "Draw on information from multiple print or digital sources, demonstrating the ability to locate an answer to a question quickly or to solve a problem efficiently."
          },
          {
            stdCode: "E.G5.C1RI.T11.RI.5.6",
            stdDesc: "Analyze multiple accounts of the same event or topic, noting important similarities and differences in the point of view they represent."
          },
          {
            stdCode: "E.G5.C1RI.T11.RI.5.9",
            stdDesc: "Integrate information from several texts on the same topic in order to write or speak about the subject knowledgeably."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.4",
            stdDesc: "Produce clear and coherent writing in which the development and organization are appropriate to task, purpose, and audience."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.5",
            stdDesc: "With guidance and support from peers and adults, develop and strengthen writing as needed by planning, revising, editing, rewriting, or trying a new approach."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.8",
            stdDesc: "Recall relevant information from experiences or gather relevant information from print and digital sources; summarize or paraphrase information in notes and finished work, and provide a list of sources."
          },
          {
            stdCode: "E.G5.C2WN.T2.W.5.9",
            stdDesc: "Draw evidence from literary or informational texts to support analysis, reflection, and research."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2a",
            stdDesc: "Introduce a topic clearly, provide a general observation and group related information logically; include formatting (e.g., headings), illustrations, and multimedia when useful to aiding comprehension."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2b",
            stdDesc: "Develop the topic with facts, definitions, concrete details, quotations, or other information and examples related to the topic."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2c",
            stdDesc: "Link ideas within and across categories of information using words, phrases, and clauses (e.g., *in contrast, especially*)."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2d",
            stdDesc: "Use precise language and domain-specific vocabulary to inform about or explain the topic."
          },
          {
            stdCode: "E.G5.C2WI.T3a.W.5.2e",
            stdDesc: "Provide a concluding statement or section related to the information or explanation presented."
          },
          {
            stdCode: "E.G5.C2WO.T6a.W.5.1b",
            stdDesc: "Provide logically ordered reasons that are supported by facts and details."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "PT",
        clarification: "-   Performance Task (PT): In general, the PT should allow students to demonstrate deeper thinking and allow more integration of information from resources. Sources should cover the subject sufficiently enough to allow students to develop a main idea, but not be too general.\r\n\r\n-   Choosing Sources: Overall, the sources should offer more factual information and citations than just unsupported opinions. Stories or other works of fiction are not appropriate for the Grade 3–5 research tasks. Do not use literary fiction in the Grade 3-5 tasks.\r\n\r\n-   Each performance task (PT) should be as unique as possible. Within a PT set, stimuli may, however, be used in more than one PT if necessary and important to the task. This must be done cautiously and to a limited extent only. There should be different companion stimuli and, in addition, the two PTs must not have the same focus. Choose sources with writing assignment in mind. Think about writing assignment and whether sources provide enough information for an appropriate informational full write. Try not to create a writing assignment around a set of sources – the writing purpose **should come from the sources** and not be a forced fit.\r\n\r\n-   Claim 4 Targets: Target 2 will focus on choosing text and visual elements that support a research central idea, key detail, and/or given purpose as well as the integration of notes into a central idea or key detail category. Target 3 will focus on analyzing sources in order to locate additional information, such as relevant sources of information and relevant information from visual elements that will enhance an existing piece of student writing. Target 4 will focus on using/selecting evidence to support an opinion, idea, or analysis.\r\n\r\n-   Research Questions: The three research questions must represent at least two different Claim 4 targets. Within a PT set, an item task model for a research question (RQ) can be used across PTs.",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student will locate information from multiple sources to support a central idea or subtopic related to research.",
          "The student will write full informational texts on a topic using a complete writing process attending to purpose and audience: organize ideas by stating a focus (main idea); include text structures and appropriate transitional strategies for coherence; include elaboration and supporting evidence from sources; and develop an appropriate conclusion related to the information or explanation presented.",
          "The student will analyze digital and print sources in order to locate relevant information to support research.",
          "The student will select evidence to support opinions, ideas, or analyses based on evidence collected and analyzed.",
          "The student will integrate information from multiple text sources to support a given purpose related to research tasks."
        ],
        vocab: "string",
        tools: "Word processing tools including spell check",
        stimInfo: "**Informational and literary nonfiction texts:** Includes the subgenres of articles, essays, memoirs, speeches, interviews, primary and secondary accounts, how-to articles, and functional reading.\r\n\r\n-   Stimuli should include information about the sources (including in-text citations for opinions) that aids the student in assessing the relevance or usefulness of the information presented in the sources.\r\n\r\n-   Stimuli should be presented as a set of sources that students might authentically find through a search, in alignment with the context of the writing assignment. Stimuli for research (three for Grade 5) should have some references and footnotes/in-text citations resembling authentic research sources.\r\n\r\n-   The set of sources should provide enough evidence that allows students to establish and support a main idea, rather than simply restating the ideas within the sources. Sources should not be encyclopedic or too general.\r\n\r\n-   The set of sources should together provide a comprehensive and richer collection of information than any one source alone and should encourage integration of information. Sources need some overlap of ideas to allow for analysis across texts.\r\n\r\n-   Overall, the sources should offer more factual information and citations than just unsupported opinions.\r\n\r\n**Literary fiction texts:** Includes the subgenres of narrative fiction, short stories, poetry, and song lyrics.\r\n\r\n-   Stories or other works of fiction are not appropriate for the Grade 3–5 research tasks. Do not use literary fiction in Grade 3–5 tasks.\r\n\r\nVisual/graphic sources: Includes the subgenres of data tables and graphs, maps, info-graphics, timelines, diagrams, photographs, drawings, and artwork.\r\n\r\n-   In any set of textual stimuli for research, visual/graphic sources that are included within the stimuli must serve a purpose other than to simply break up the text (e.g., making an abstract concept, idea, or process described in the source more understandable, providing additional information relevant to understanding the topic or subtopic). They should be highly relevant to the topic or subtopic of the source and not introduce distracting or irrelevant information.\r\n\r\n-   Visuals should not be so complicated that they add to the reading load.\r\n\r\n-   Care should be taken in the selection of visual/graphic sources in consideration of accessibility issues for students with visual impairments. However, not ALL tasks must be accessible for visually impaired students.\r\n\r\n-   If a PT uses the maximum number of sources allowed for a PT (three for Grade 5), one source may be a visual/graphic source in itself.",
        devNotes: "When there is more than one DOK listed, DOK 3 is for machine-scored items and DOK 4 is for short-text items.",
        complexity: "PT stimuli should follow the guidelines in the stimulus specifications document: Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications; however, the complexity of the stimuli, taken as a whole, should be at approximately the lower end of the target grade level. The vocabulary used in the stimulus and the item should be on or below grade level. In some instances, vocabulary may be above grade level as long as the stimulus has sufficient context to support the meaning of the word. In other cases, a complex authentic source that is at a reading level above the target grade (e.g., a historical primary source document) may be included, but these should be used with caution and with appropriate supports (e.g., historical context, definitions of key terms).",
        dualText: "NA",
        accessibility: "string",
        stem: [
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus\r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 discusses &#60topic&#62. Explain how the information in Source \\#2 adds to the reader’s understanding of &#60topic&#62. Give **two** [details/examples] from Source \\#2 to support your explanation.\r\n\r\n-   Source \\#1 and Source \\#3 discuss &#60topic&#62. Explain what the sources say about &#60topic&#62. Use **two** details, one detail from Source \\#1 and one detail from Source \\#3, to support your explanation. For each detail, include the source title or number.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 includes information about &#60topic&#62. Explain how this information would be helpful if it were added to Source \\#2. Give **two** [details/examples] from Source \\#2 to support your explanation.\r\n\r\n-   Source \\#1 and Source \\#2 discuss &#60topic&#62. What does Source \\#1 explain about &#60topic&#62 that Source \\#2 does not? Explain why that information is helpful for the reader. Give **two** [details/examples] from Source \\#1 to support your explanation.\r\n\r\n-   Source \\#1 includes a [chart/graph/photograph]. Explain how this [chart/graph/photograph] would be helpful if it were added to Source \\#2. Give **two** [details/examples] from Source \\#2 to support your explanation.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus\r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 gives information about &#60topic&#62. Choose [**two**/**three**] [facts/ideas/details] from Source \\#2 that give **different** information about &#60topic&#62.\r\n\r\n-   Choose [**two**/**three**] [details/ideas] that explain what **both** Source \\#1 and Source \\#2 say about &#60topic&#62.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Which source is **most** helpful in understanding &#60idea/process&#62? Explain why this source is **most** helpful. Give **two** [details/examples] from the source to support your explanation.\r\n\r\n-   Which source has the **most** useful information about &#60topic&#62? Explain why this source has the **most** useful information about &#60topic&#62. Give **two** [details/examples] from the source to support your explanation.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stem:**\r\n- Which source has the **most** useful information about &#60topic&#62? Choose **one** answer that gives the source number and correctly explains why this is the **most** useful source.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Explain [why/how] &#60idea/opinion&#62. Give **two** [reasons/details/examples], one [reason/detail/example] from Source \\#1 and one [reason/detail/example] from Source \\#2, to support your explanation. For each [reason/detail/example], include the source title or number.\r\n\r\n-   Explain what would happen if &#60possible effect from cause discussed in sources&#62. Give at least **two** [details/examples], one [detail/example] from Source \\#1 and one [detail/example] from Source \\#2, to support your explanation. For each [detail/example], include the source title or number.\r\n\r\n-   Each source explains &#60topic/information&#62. Explain why this [topic/information] is important. Give **two** examples, one example from Source \\#1 and one example from Source \\#2, to support your explanation. For each example, include the source title or number.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** No additional stimulus \r\n\r\n**Stems:**\r\n\r\n-   Click on the boxes to match each source with the [idea/opinion] that it supports. Some [ideas/opinions] may have more than one source selected.\r\n\r\n   **Example of Formatting:**\r\n\r\n|   | Source #1: [title] |  Source #2: [title] |  Source #3: [title] |\r\n|---|--------|--------|--------|\r\n| [idea/opinion] _____________   |  |   |   |\r\n| [idea/opinion]_____________   |  |   |   |\r\n $~$ \r\n\r\n \r\n-   Look at the [ideas/opinions] in the table. Decide if the information in Source #1, Source #2, both sources, or neither source supports each [idea/opinion]. Click on the box to match the source that supports each [idea/opinion]. There will be only one box selected for each [idea/opinion]. \r\n\r\n**Example of Formatting:**\r\n\r\n\r\n\r\n|  |  Source #1: [title] |  Source #2: [title] |  Both  |  Neither  | \r\n|------------------|---|---|---|---|\r\n| [idea/opinion] |   |   |   |   |  \r\n| [idea/opinion] |   |   |   |   |  \r\n| [idea/opinion] |   |   |   |   |  \r\n$~$\r\n\r\n**Clarifications:** Matching tables should have no more than three correct answers at this grade level. If there are too many defensible options (check every possibility) do not use this item type, use multiple-choice.",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "NA",
            shortStem: "Appropriate Stems"
          },
          {
            stemDesc: "**Lead-in:** No lead-in\r\n\r\n**Stimulus:** G5.T2. Excerpt from one of the Sources \r\n\r\n**Stems:**\r\n\r\n-   Source \\#1 says &#60quote&#62. Click on [**one**/**two**/**three**] sentence(s) in Source \\#2 below that support this [idea/detail].\r\n\r\n**Clarifications:** The stem should appear above the excerpt, not after it.",
            shortStem: "Appropriate Stems"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1",
            taskDesc: "NA",
            examples: "NA",
            stimulus: "string"
          },
          {
            taskName: "Task Model 3",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 4",
            taskDesc: "The student will locate sentences from a source presented in the performance task that provide different information from/supporting information to the information presented in another source from the performance task.\r\n\r\nThe **answer choices** should be six to eight sentences from a source presented in the performance task; however, regardless of the number of answer options and correct responses, the correct responses must equal less than half of the total answer options. To avoid clueing, the topic that is stated in the stem should either not use the explicit wording of the answer choices, or contain a balance of wording across the answer choices. To avoid outliers, be sure that the answer choices are about the same length, staggered evenly, or that a balance of length is used (e.g., three short, three long). Order the choices from shortest to longest.\r\n\r\nThe **correct answer choices** should be sentences that clearly provide differing information from/supporting information to the information given about the topic from the source mentioned in the stem.\r\n\r\n**Distractors** are the sentences that should reflect common student errors. Plausible distractors for this model might include (1) sentences that are on topic but do not provide differing information from the information presented in the source that is mentioned in the stem and/or (2) sentences that are interesting facts but do not provide differing information from the information presented in the source that is mentioned in the stem.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 5",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 6",
            taskDesc: "The student will locate the source description that provides the most useful information about a topic given in the stem.\r\n\r\nThe **answer choices** should be source titles, numbers, and descriptions of the sources that are provided in the performance task. To avoid clueing, be sure that the answer choices do not contain wording from the topic mentioned in the stem, or contain a balance of wording across the options. To avoid outliers, be sure that the answer choices are about the same length, staggered evenly, or that a balance of length is used (i.e., two short, two long). Order the choices from shortest to longest.\r\n\r\nThe **correct answer choice** should be one source description that is correct and provides the most useful information on the topic mentioned in the stem.\r\n\r\n**Distractors** are the sentences that should reflect common student errors. \r\n\r\n**Plausible distractors** for this model might include (1) a source that is inaccurate and/or (2) a source that contains opinions or speculation and/or 3) information from the source that is not useful for the topic.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 7",
            taskDesc: "NA",
            examples: "NA"
          },
          {
            taskName: "Task Model 8",
            taskDesc: "The student will match ideas/opinions to a source number and title. To avoid clueing, do not use the same wording in the idea/opinion as is used in the sources. The student should not be able to match the idea/opinion to the source that supports it by simply matching the wording used.\r\n\r\nThe **correct answer choices** should fit clearly into one category listed in the table. If there are too many defensible options (check every possibility) do not use this item type, use multiple-choice.\r\n\r\n**Rationales** should state the justification for why the plausible distractor is incorrect.",
            examples: "NA"
          },
          {
            taskName: "Task Model 9",
            taskDesc: "Create an informational writing assignment that flows naturally from the research scenario given in the Student Directions (see “Task Description” above). An informational assignment must provide the following information:\r\n\r\n-   A purpose for writing\r\n\r\n-   A description of the audience\r\n\r\n-   A clear direction to write a main idea supported by details from the sources",
            examples: "NA"
          },
          {
            taskName: "Task Model 2",
            taskDesc: "**Presenting the Sources:** The sources should not be presented with \"Read this story/article/letter to the editor.\" Students need to initially skim the sources with a purpose, be able to see the questions they will need to answer, and then go back and read the sources more carefully to find the answers.\r\n\r\n**Sample Setup #1:** “As part of your research you have found three sources. \r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Sample Setup #2:** “You decide to look up more information about this topic. You have found three sources about this topic.\r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Sample Setup #3:** “Your teacher takes your class to the library to look up more information. You have found three sources about this topic.\r\n\r\nAfter you have reviewed these sources, you will answer some questions about them. Briefly skim the sources and the three questions that follow. Then, go back and read the sources carefully so you will have the information you will need to answer the questions and complete your research.”\r\n\r\n**Task Description:** The Student Directions should include a motivating setup for every task that provides a paragraph/scenario explaining in an engaging way the issue the student will be researching. The setup places the student in a role to complete a particular task related to the issue. This should be done by establishing the reason for and nature of the research to be done without giving away the final assignment (see examples below in Sample Assignments). The actual assignment for the full write will appear later when it is time to start that task, but the role and issue will allow the student to read with a purpose and a frame of reference.\r\n\r\nThe performance task provides two short-text items and one machine-scored item on Claim 4 Targets 2, 3, and 4 and one Claim 2 Target 4 informational full write. The three Claim 4 items should build toward the full write by increasing the students’ interaction with the sources in preparation for addressing the research demands of the full write.\r\n\r\nIn the informational full write, the student will draw relevant ideas and information from the sources, answering the “what” about the topic, elaborating when necessary, and maintaining a clear focus throughout. Students should reference the sources used when integrating relevant information in their writing. The student will address a specific audience and purpose in the full write.\r\n\r\nAfter drafting the full write, the student will revise and edit, paying attention to clarity and accuracy as well as to language conventions (e.g., grade-appropriate grammar usage, spelling, capitalization, and punctuation).",
            examples: "Your teacher is creating a bulletin board display in the school library to show what your class has learned about different kinds of jobs. You decide to write an informational article on astronauts. Your article will be read by other students, teachers, and parents.\r\n\r\nUsing more than one source, develop a main idea about being an astronaut. Choose the most important information from the sources to support your main idea. Then, write an informational article that is several paragraphs long. Clearly organize your article and support your main idea with details from the sources. Use your own words except when quoting directly from the sources. Be sure to give the source title or number when using details from the sources."
          }
        ],
        rubrics: [
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by two [details/examples] from Source #2.",
          "Rubric 1a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by two vague or loosely related [details/examples] from Source #2. \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how the information in Source #2 adds to the reader’s understanding of &#60topic&#62 discussed in Source #1 supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an adequate evidence-based explanation of &#60topic&#62 supported by two details, one from Source #1 and one from Source #3.  Student cites the source for each detail.",
          "Rubric 1b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of &#60topic&#62 supported by two vague or loosely related details, one from Source #1 and one from Source #3.  Student cites the source for each detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by two details from either Source #1 or Source #3.  Student cites the source for each detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by one detail from either Source #1 or Source #3.  Student cites the source for the detail.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of &#60topic&#62 supported by two details, one from Source #1 and one from Source #3.  Student does not cite the source for each detail.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by two [details/examples] from Source #2.",
          "Rubric 3a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by two vague or loosely related [details/examples] from Source #2.  \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how information about &#60topic&#62 in Source #1 would be helpful if it were added to Source #2. The explanation is supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and an adequate evidence-based explanation of why that information is helpful for the reader supported by two [details/examples] from Source #1.",
          "Rubric 3b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and a limited/partial evidence-based explanation of why that information is helpful for the reader supported by two vague or loosely related [details/examples] from Source #1.  \r\n**OR**\r\nResponse is an identification of what Source #1 explains about &#60topic&#62 that Source #2 does not and an adequate evidence-based explanation of why that information is helpful for the reader supported by one [detail/example] from Source #1.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "Response is an identification of which source is most helpful  in understanding &#60idea/process&#62 and an adequate evidence-based explanation of why it is  most helpful in understanding  &#60idea/process&#62, supported by two [details/examples] from the identified source.",
          "Rubric 5a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of which source is most helpful in understanding &#60idea/process&#62 and a limited/partial evidence-based explanation of why it is most helpful in understanding  &#60idea/process&#62, supported by two vague or loosely related [details/examples] from the identified source.  \r\n**OR**\r\nResponse is an identification of which source is most helpful in understanding &#60idea/process&#62 and an adequate evidence-based explanation of why it is most helpful in understanding &#60idea/process&#62, supported by one [detail/example] from the identified source.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.  Just identifying the source is insufficient.",
          "Scoring Rules",
          "Response is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student cites the source for each [reason/detail/example].",
          "Rubric 7a",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two vague or loosely related [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student cites the source for each [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples] from one source.  Student cites the source for each [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by one [reason/detail/example] from one source.  Student cites the source for the [reason/detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of [why/how] &#60idea/opinion&#62 supported by two [reasons/details/examples], one [reason/detail/example] from Source #1 and one [reason/detail/example] from Source #2.  Student does not cite the source for each [reason/detail/example].",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Response is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student cites the source for each [detail/example].",
          "Rubric 7b",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two vague or loosely related [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student cites the source for each [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples] from one source.  Student cites the source for each [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by one [detail/example] from one source.  Student cites the source for the [detail/example].\r\n**OR**\r\nResponse is an adequate evidence-based explanation of what would happen if &#60possible effect from a cause discussed in sources&#62 supported by two [details/examples], one [detail/example] from Source #1 and one [detail/example] from Source #2.  Student does not cite the source for each [detail/example].",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Scoring Rules",
          "**Sample Informational Scoring:**\r\n\r\n**REMEMBER: A well-written informational &#60type of assignment&#62**\r\n\r\n-   has a clear main idea\r\n\r\n-   is well organized and stays on topic\r\n\r\n-   has an introduction and conclusion\r\n\r\n-   uses transitions\r\n\r\n-   uses details from the sources to support your main idea\r\n\r\n-   puts the information from the sources in your own words, except when using direct quotations from the sources\r\n\r\n-   gives the title or number of the source for the details or facts you included\r\n\r\n-   develops ideas clearly\r\n\r\n-   uses clear language\r\n\r\n-   follows rules of writing (spelling, punctuation, and grammar usage)\r\n\r\n**Scoring Rules for the Performance Task:**\r\n\r\n2-point rubric for hand-scored research question responses\r\n\r\n10-point analytic rubric for full write (4 points for organization/purpose; 4 points for evidence/elaboration; 2 points for conventions)",
          "**The response has a clear and effective organizational structure, creating a sense of unity and completeness. The organization is sustained between and within paragraphs. The response is consistently and purposefully focused:**\r\n\r\n-\tcontrolling/main idea of a topic is clearly communicated, and the focus is strongly maintained for the purpose and audience\r\n\r\n-\tconsistent use of a variety of transitional strategies to clarify the relationships between and among ideas\r\n\r\n-\teffective introduction and conclusion\r\n\r\n-\tlogical progression of ideas from beginning to end; strong connections between and among ideas with some syntactic variety",
          "Rubric 9 - Organization/Purpose",
          "**The response has an evident organizational structure and a sense of completeness. Though there may be minor flaws, they do not interfere with the overall coherence. The organization is adequately sustained between and within paragraphs. The response is generally focused:**\r\n\r\n- controlling/main idea of a topic is clear, and the focus is mostly maintained for the purpose and audience\r\n\r\n- adequate use of transitional strategies with some variety to clarify the relationships between and among ideas\r\n\r\n- adequate introduction and conclusion\r\n\r\n- adequate progression of ideas from beginning to end; adequate connections between and among ideas",
          "**The response has an inconsistent organizational structure. Some flaws are evident, and some ideas may be loosely connected. The organization is somewhat sustained between and within paragraphs. The response may have a minor drift in focus:**\r\n\r\n-\tcontrolling/main idea of a topic may be somewhat unclear, or the focus may be insufficiently sustained for the purpose and/or audience\r\n\r\n-\tinconsistent use of transitional strategies and/or little variety\r\n\r\n-\tintroduction or conclusion, if present, may be weak\r\n\r\n-\tuneven progression of ideas from beginning to end; and/or formulaic; inconsistent or unclear connections between and among ideas",
          "The response has little or no discernible organizational structure. The response may be related to the topic but may provide little or no focus:\r\n\r\n- controlling/main idea may be confusing or ambiguous; response may be too brief or the focus may drift from the purpose and/or audience\r\n\r\n- few or no transitional strategies are evident\r\n\r\n- introduction and/or conclusion may be missing\r\n\r\n- frequent extraneous ideas may be evident; ideas may\r\nbe randomly ordered or have an unclear progression",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "NA",
          "**The response provides adequate elaboration of the support/evidence for the controlling/main idea that includes the use of source material. The response adequately develops ideas, employing a mix of precise and more general language:**\r\n\r\n-\tadequate evidence (facts and details) from the source material is integrated and relevant, yet may be general\r\n\r\n-\tadequate use of citations or attribution to source material\r\n\r\n-\tadequate use of some elaborative techniques [1]\r\n\r\n-\tvocabulary is generally appropriate for the audience and purpose\r\n\r\n-\tgenerally appropriate style is evident\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "Rubric 9 - Evidence/Elaboration",
          "**The response provides uneven, cursory elaboration of the support/evidence for the controlling/main idea that includes uneven or limited use of source material. The response develops ideas unevenly, using simplistic language:**\r\n\r\n-\tsome evidence (facts and details) from the source material may be weakly integrated, imprecise, repetitive, vague, and/or copied\r\n\r\n-\tweak use of citations or attribution to source material\r\n\r\n-\tweak or uneven use of elaborative techniques [1]; development may consist primarily of source summary\r\n\r\n-\tvocabulary use is uneven or somewhat ineffective for the audience and purpose\r\n\r\n-\tinconsistent or weak attempt to create appropriate style\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "**The response provides minimal elaboration of the support/evidence for the controlling/main idea that includes little or no use of source material. The response is vague, lacks clarity, or is confusing:**\r\n\r\n-\tevidence (facts and details) from the source material is minimal, irrelevant, absent, incorrectly used, or predominantly copied\r\n\r\n-\tinsufficient use of citations or attribution to source material\r\n\r\n-\tminimal, if any, use of elaborative techniques [1]\r\n\r\n-\tvocabulary is limited or ineffective for the audience and purpose\r\n\r\n-\tlittle or no evidence of appropriate style\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "NA",
          "**The response provides thorough elaboration of the support/evidence for the controlling/main idea that includes the effective use of source material. The response clearly and effectively develops ideas, using precise language:**\r\n\r\n-\tcomprehensive evidence (facts and details) from the source material is integrated, relevant, and specific\r\n\r\n-\tclear citations or attribution to source material\r\n\r\n-\teffective use of a variety of elaborative techniques [1]\r\n\r\n-\tvocabulary is clearly appropriate for the audience and purpose\r\n\r\n-\teffective, appropriate style enhances content\r\n\r\n[1] Elaborative techniques may include the use of personal experiences that support the controlling/main idea",
          "**The response demonstrates an adequate command of conventions:**\r\n\r\n-\tadequate use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "Rubric 9 - Conventions",
          "**The response demonstrates a partial command of conventions:**\r\n\r\n-\tlimited use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "- Insufficient (includes copied text)\r\n\r\n- In a language other than English\r\n\r\n- Off-topic\r\n\r\n- Off-purpose",
          "**Holistic Scoring:**\r\n\r\n-\tVariety: A range of errors includes sentence formation, punctuation, capitalization, grammar usage, and spelling.\r\n-\tSeverity: Basic errors are more heavily weighted than higher-level errors.\r\n-\tDensity: The proportion of errors to the amount of writing done well. This includes the ratio of errors to the length of the piece.",
          "**The response demonstrates little or no command of conventions:**\r\n\r\n-\tinfrequent use of correct sentence formation, punctuation, capitalization, grammar usage, and spelling",
          "Rubric 3c",
          "Response is an adequate evidence-based explanation of how the [chart/graph/photograph] in Source #1 would be helpful if it were added to Source #2 supported by two [details/examples] from Source #2.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of how the [chart/graph/photograph] in Source #1 would be helpful if it were added to #2 supported by two vague or loosely related [details/examples] from Source #2.  \r\n**OR**\r\nResponse is an adequate evidence-based explanation of how the [chart/table/photograph] in Source #1 would be helpful if it were added to Source #2 supported by one [detail/example] from Source #2.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "Rubric 5b",
          "Response is an identification of which source has the most useful information about &#60topic&#62 and an adequate evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by two [details/examples] from the identified source.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is an identification of which source has the most useful information about &#60topic&#62 and a limited or partial evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by two vague or loosely related [details/examples] from the identified source.  \r\n**OR**\r\nResponse is an identification of which source has the most useful information about &#60topic&#62 and an adequate evidence-based explanation of why it has the most useful information about &#60topic&#62, supported by one [detail/example] from the identified source.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.  Just identifying the source is insufficient.",
          "Rubric 7c",
          "Response is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples, one example from Source #1 and one example from Source #2.  Student cites the source for each example.",
          "**Scoring Note:** Score point 1 encompasses partially correct responses.\r\n\r\nResponse is a limited/partial evidence-based explanation of  why &#60topic/information&#62 is important supported by two vague or loosely related examples, one example from Source #1 and one example  from Source #2.  Student cites the source for each example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples from one source.  Student cites the source for each example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by one example from one source.  Student cites the source for the example.\r\n**OR**\r\nResponse is an adequate evidence-based explanation of why &#60topic/information&#62 is important supported by two examples, one example from Source #1 and one example from Source #2.  Student does not cite the source for each example.",
          "Response is an explanation that is insufficient, incorrect or irrelevant.",
          "NA",
          "NA",
          "NA",
          "NA"
        ]
      }
    ]
  },
  {
    title: "Grade 3 Mathematics Item Specification C1",
    claimNumber: "C1",
    grades: 3,
    subject: "Math",
    shortCode: "M.G3.C1",
    domain: "string",
    target: [
      {
        title: "Grade 3 Mathematics Item Specification C1 TH",
        shortCode: "M.G3.C1MD.TH",
        description: "Represent and interpret data.",
        standards: [
          {
            stdCode: "M.G3.C1MD.TH.3.MD.B.3",
            stdDesc: "Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories. Solve one- and two-step \"how many more\" and \"how many less\" problems using information presented in scaled bar graphs. *For example, draw a bar graph in which each square in the bar graph might represent 5 pets.*"
          },
          {
            stdCode: "M.G3.C1MD.TH.3.MD.B.4",
            stdDesc: "Generate measurement data by measuring lengths using rulers marked with halves and fourths of an inch. Show the data by making a line plot, where the horizontal scale is marked off in appropriate units— whole numbers, halves, or quarters."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "string",
        clarification: "Tasks associated with this target should involve using information presented in scaled bar graphs to solve one- and two-step “how many more” and “how many less” problems. Technology might be used to enable students to draw a scaled picture graph and a scaled bar graph to represent a data set with up to four categories. Other tasks can involve the cycle indicated in 3.MD.B.4 (measure to generate data and show the data by making a line plot); such tasks should indeed involve fractional measurement values.",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student creates a scaled picture graph and a scaled bar graph to represent a data set with up to four categories.",
          "The student solves one-and two-step “how many more” and “how many less” problems using information presented in scaled bar graphs.",
          "The student generates measurement data by measuring lengths using rulers marked with halves and fourths of an inch and makes a line plot with fractional measurement values."
        ],
        vocab: "scaled bar graph, scaled picture graph, line plot",
        tools: "None",
        stimInfo: "string",
        devNotes: "Items where students are required to generate measurement data and make a line plot (per CCSS 3.MD.B.4) will be covered in Claims 2 and 4.",
        complexity: "string",
        dualText: "string",
        accessibility: "string",
        stem: [
          {
            stemDesc: "string",
            shortStem: "string"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1a",
            taskDesc: "**Prompt Features:** The student is prompted to generate a scaled picture graph or a scaled bar graph.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   generates scaled picture graph or bar graph; includes key of 2, 5, or 10\r\n\r\n    -   generates scaled picture graph or bar graph; includes key of 3 or 4\r\n\r\n-   Data categories should be presented and equally distributed in the following types:\r\n\r\n    -   two, three, or four categories\r\n\r\n-   Graph orientation of scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   Data for each category is entered either vertically or horizontally",
            examples: "Examples",
            stimulus: "The student is presented with a data set with two to four categories."
          },
          {
            taskName: "Task Model 2",
            taskDesc: "**Prompt Features:** The student is prompted to identify the solution involving “how many less” or “how many more” using information presented in scaled bar graphs.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Item difficulty can be adjusted via these example methods:\r\n\r\n    -   Solving one– or two-step word problems should be among the following types:\r\n\r\n        -   one-step “how many less” or “how many more” problems with or without regrouping\r\n\r\n        -   two-step “how many less” or “how many more” problems with or without regrouping\r\n\r\n-   Scaled picture graphs and bar graphs should be among the following types:\r\n\r\n     -   scaled bar graph; includes key of 1\r\n\r\n     -   scaled bar graph; includes key of 2, 5, or 10\r\n\r\n     -   scaled bar graph; includes key of 3 or 4\r\n\r\n-   Data categories should be presented and equally distributed in the following types:\r\n\r\n    -   two, three, or four categories\r\n\r\n-   Orientation of scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   Data for each category is displayed either vertically or horizontally",
            examples: "**Example Stem 1:** Marco and Beth each read the number of books shown.\r\n\r\n| **Student** | **Number of Books Read** |\r\n|:-------------:|:--------------------------:|\r\n| Marco       | 12                       |\r\n| Beth        | 21                       |\r\n\r\nClick in each row to create a picture graph that shows the number of books each student read.\r\n\r\n![](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image001.png)\r\n\r\n**Rubric:** (1 point) The student creates a picture or a bar graph to show the correct number for each category of data (e.g., shown below).\r\n\r\n![](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image002.png)",
            stimulus: "The student is presented with a one- or two-step word problem and is expected to solve by using information displayed in the graph."
          },
          {
            taskName: "Task Model 3",
            taskDesc: "**Prompt Features:** The student is prompted to make a line plot using given measurement data.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Tables of measured data should be equally distributed among the following types:\r\n\r\n    -   5 measured items on the table in order\r\n\r\n    -   5 measured items on the table in random order\r\n\r\n-   Line plots using measurement data should be equally distributed among the following types:\r\n\r\n    -   a horizontal scale marked in whole units\r\n\r\n    -   a horizontal scale marked in half units\r\n\r\n    -   a horizontal scale marked in quarter units",
            examples: "**Example Stem 2:** Four students read the number of books shown.\r\n\r\n| **Student** | **Number of Books Read** |\r\n|-------------|:--------------------------:|\r\n| Bob         | 15                       |\r\n| Lisa        | 50                       |\r\n| Nancy       | 25                       |\r\n| Juan        | 40                       |\r\n\r\nClick in each column to create a bar graph that shows the number of books that each student read.\r\n\r\n![Image](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image003.png)\r\n\r\n**Rubric:** (2 points) The student creates a picture or a bar graph to show the correct number for each category of data (e.g., shown below).\r\n\r\n(1 point) The student creates a picture or bar graph to show the correct number for all but one category and the single error is in the level of precision (off by one scaled unit), not in understanding.\r\n\r\n![Image](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image004.png)",
            stimulus: "The student is presented with a table of measurement data and is expected to create a line plot to represent the data."
          }
        ],
        rubrics: [
          "string"
        ]
      },
      {
        title: "Grade 3 Mathematics Item Specification C1 TH",
        shortCode: "M.G3.C1MD.TH",
        description: "Represent and interpret data.",
        standards: [
          {
            stdCode: "M.G3.C1MD.TH.3.MD.B.3",
            stdDesc: "Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories. Solve one- and two-step \"how many more\" and \"how many less\" problems using information presented in scaled bar graphs. *For example, draw a bar graph in which each square in the bar graph might represent 5 pets.*"
          },
          {
            stdCode: "M.G3.C1MD.TH.3.MD.B.4",
            stdDesc: "Generate measurement data by measuring lengths using rulers marked with halves and fourths of an inch. Show the data by making a line plot, where the horizontal scale is marked off in appropriate units— whole numbers, halves, or quarters."
          }
        ],
        DOK: [
          {
            dokCode: "string",
            dokDesc: "string",
            dokShort: "string"
          }
        ],
        type: "string",
        clarification: "Tasks associated with this target should involve using information presented in scaled bar graphs to solve one- and two-step “how many more” and “how many less” problems. Technology might be used to enable students to draw a scaled picture graph and a scaled bar graph to represent a data set with up to four categories. Other tasks can involve the cycle indicated in 3.MD.B.4 (measure to generate data and show the data by making a line plot); such tasks should indeed involve fractional measurement values.",
        heading: "Item Writing and Scoring Guidelines",
        evidence: [
          "The student creates a scaled picture graph and a scaled bar graph to represent a data set with up to four categories.",
          "The student solves one-and two-step “how many more” and “how many less” problems using information presented in scaled bar graphs.",
          "The student generates measurement data by measuring lengths using rulers marked with halves and fourths of an inch and makes a line plot with fractional measurement values."
        ],
        vocab: "scaled bar graph, scaled picture graph, line plot",
        tools: "None",
        stimInfo: "string",
        devNotes: "Items where students are required to generate measurement data and make a line plot (per CCSS 3.MD.B.4) will be covered in Claims 2 and 4.",
        complexity: "string",
        dualText: "string",
        accessibility: "string",
        stem: [
          {
            stemDesc: "string",
            shortStem: "string"
          }
        ],
        taskModels: [
          {
            taskName: "Task Model 1a",
            taskDesc: "**Prompt Features:** The student is prompted to generate a scaled picture graph or a scaled bar graph.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   generates scaled picture graph or bar graph; includes key of 2, 5, or 10\r\n\r\n    -   generates scaled picture graph or bar graph; includes key of 3 or 4\r\n\r\n-   Data categories should be presented and equally distributed in the following types:\r\n\r\n    -   two, three, or four categories\r\n\r\n-   Graph orientation of scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   Data for each category is entered either vertically or horizontally",
            examples: "Examples",
            stimulus: "The student is presented with a data set with two to four categories."
          },
          {
            taskName: "Task Model 2",
            taskDesc: "**Prompt Features:** The student is prompted to identify the solution involving “how many less” or “how many more” using information presented in scaled bar graphs.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Item difficulty can be adjusted via these example methods:\r\n\r\n    -   Solving one– or two-step word problems should be among the following types:\r\n\r\n        -   one-step “how many less” or “how many more” problems with or without regrouping\r\n\r\n        -   two-step “how many less” or “how many more” problems with or without regrouping\r\n\r\n-   Scaled picture graphs and bar graphs should be among the following types:\r\n\r\n     -   scaled bar graph; includes key of 1\r\n\r\n     -   scaled bar graph; includes key of 2, 5, or 10\r\n\r\n     -   scaled bar graph; includes key of 3 or 4\r\n\r\n-   Data categories should be presented and equally distributed in the following types:\r\n\r\n    -   two, three, or four categories\r\n\r\n-   Orientation of scaled picture graphs and bar graphs should be equally distributed among the following types:\r\n\r\n    -   Data for each category is displayed either vertically or horizontally",
            examples: "**Example Stem 1:** Marco and Beth each read the number of books shown.\r\n\r\n| **Student** | **Number of Books Read** |\r\n|:-------------:|:--------------------------:|\r\n| Marco       | 12                       |\r\n| Beth        | 21                       |\r\n\r\nClick in each row to create a picture graph that shows the number of books each student read.\r\n\r\n![](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image001.png)\r\n\r\n**Rubric:** (1 point) The student creates a picture or a bar graph to show the correct number for each category of data (e.g., shown below).\r\n\r\n![](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image002.png)",
            stimulus: "The student is presented with a one- or two-step word problem and is expected to solve by using information displayed in the graph."
          },
          {
            taskName: "Task Model 3",
            taskDesc: "**Prompt Features:** The student is prompted to make a line plot using given measurement data.\r\n\r\n**Stimulus Guidelines:**\r\n\r\n-   Follow any stated guidelines on allowable number ranges.\r\n\r\n-   Tables of measured data should be equally distributed among the following types:\r\n\r\n    -   5 measured items on the table in order\r\n\r\n    -   5 measured items on the table in random order\r\n\r\n-   Line plots using measurement data should be equally distributed among the following types:\r\n\r\n    -   a horizontal scale marked in whole units\r\n\r\n    -   a horizontal scale marked in half units\r\n\r\n    -   a horizontal scale marked in quarter units",
            examples: "**Example Stem 2:** Four students read the number of books shown.\r\n\r\n| **Student** | **Number of Books Read** |\r\n|-------------|:--------------------------:|\r\n| Bob         | 15                       |\r\n| Lisa        | 50                       |\r\n| Nancy       | 25                       |\r\n| Juan        | 40                       |\r\n\r\nClick in each column to create a bar graph that shows the number of books that each student read.\r\n\r\n![Image](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image003.png)\r\n\r\n**Rubric:** (2 points) The student creates a picture or a bar graph to show the correct number for each category of data (e.g., shown below).\r\n\r\n(1 point) The student creates a picture or bar graph to show the correct number for all but one category and the single error is in the level of precision (off by one scaled unit), not in understanding.\r\n\r\n![Image](https://case.smarterbalanced.org/content/Documents/Item%20Specs/Math_Item_Specs/Claim1_mathematics_Gr3_specs/media_G3_Math_1H_MD/image004.png)",
            stimulus: "The student is presented with a table of measurement data and is expected to create a line plot to represent the data."
          }
        ],
        rubrics: [
          "string"
        ]
      }
    ]
  }
];