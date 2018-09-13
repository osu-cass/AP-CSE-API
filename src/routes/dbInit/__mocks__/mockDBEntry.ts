// tslint:disable
export const mockDB = 
[
    {
      title: 'English Language Arts Specification: Grade 3 Claim 1',
      claimNumber: 'C1',
      grades: 3,
      subject: 'English Language Arts',
      shortCode: 'E.G3.C1',
      target: [
        {
          title: 'English Language Arts Specification: Grade 3 Claim 1 Target 1',
          shortCode: 'E.G3.C1RL.T1',
          description: 'Given an inference or conclusion, use explicit details and implicit information from the text to support the inference or conclusion provided.',
          standards: [
            {
              stdCode: 'E.G3.C1RL.T1.RL.3.1',
              stdDesc: 'Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers.'
            }
          ],
          DOK: [
            {
              dokCode: 'string',
              dokDesc: 'string',
              dokShort: 'string'
            }
          ],
          type: 'CAT',
          clarification: 'Students identify/select appropriate supporting text evidence for one or more GIVEN inferences or conclusions. The item stem must state an inference or conclusion drawn from the text, not merely paraphrase or quote words directly from the text.\r\n\r\nNote: in RL Target 4, students supply both the inference/conclusion AND the evidence.\r\n\r\nAll items are text-dependent. No item is answerable without reading the text.\r\n\r\nAll items should require students to cite specific textual evidence to support conclusions drawn from the text(s).',
          heading: 'Item Writing and Scoring Guidelines',
          evidence: [
            'The student will identify text evidence (explicit details and/or implicit information) to support a GIVEN inference or conclusion based on the text.'
          ],
          vocab: 'NA',
          tools: 'NA',
          stimInfo: 'Stimuli are texts of literary fiction. Texts will include sufficient detail, both stated and implied, to allow for the formation of inferences or conclusions.\r\n\r\nRefer to Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications for more information on literary text types.',
          devNotes: 'NA',
          complexity: 'NA',
          dualText: 'When a dual-text set contains one literary and one informational text, the literary text (text #1) is the primary focus, and the set of items must include items from the literary stimulus as well as items written across both texts. The informational text (text #2) must only be used as a foundational piece for the literary text, and no items can be written for only the informational text. If both texts are literary, items may be written to either or both. All dual-text stimuli sets should contain between 25-40% items written across both texts. \r\n\r\nWhen developing items from dual-text, Task Model 5 (short text constructed response-WR) should be written using the Appropriate Stems for Dual-Text Stimuli only to ensure students will have the opportunity to respond in writing to information from both texts.  Between 25-40% of all other items written in the dual-text set should be written across both texts. \r\n\r\nThe title of the each text should be included in the stem when more than one text is used.  Dual-text is considered long text.',
          accessibility: 'string',
          stem: [
            {
              stemDesc: '-   Which [detail/sentence/line] from the passage **best** supports [provide inference or conclusion based on the passage]?\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?\r\n\r\n-   The reader can [infer/conclude] [provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the passage].\r\n    Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Which [detail/sentence/line] from [title text \\#1] **best** shows that [provide inference or conclusion based on both passages] is true of **both** passages? **NOTE:** This stem is only used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Which [detail/sentence/line] from [title text #1] **best** supports the same idea?',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            },
            {
              stemDesc: '-   Choose **two** [details/sentences/lines] from the passage that **best** support the [inference/conclusion] that [provide inference or conclusion based on the passage].\r\n\r\n-   Which [details/sentences/lines] from the passage **best** support [provide inference or conclusion based on the passage]? Choose **two** answers.\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Which  [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion]? Choose **two** answers.\r\n\r\n-   Read this [inference/conclusion].\r\n    [provide inference or conclusion based on the text]\r\n    Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Which [details/sentences/lines] from [text \\#1 name] **best** show that [provide inference or conclusion based on the two passages] is true of  **both** passages? Choose **two** answers.\r\n**NOTE:** This stem can only be used with two literary passages.\r\nBased on the information in [title text \\#2], [provide inference or conclusion based on passage \\#2]. Which [details/sentences/lines] from [text \\#1 name] **best** support the same idea? Choose **two** answers.',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            },
            {
              stemDesc: '-   Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion].\r\n[excerpted selectable text]\r\nThe [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Inference or conclusion based on the passage].\r\nClick the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the text].\r\n    Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs that **best** support this inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Both [title passage \\#1] and [title text \\#2] show [provide inference or conclusion based on both passages]. First, click the [detail/sentence/set of sentences/line in the paragraph] from [title text \\#1] that **best** supports [provide inference or conclusion]. Next, click on the [detail/sentence/set of sentences/line in the paragraph] from [title text #2] that also supports [provide inference or conclusion].\r\n[excerpted selectable text]\r\n**NOTE:** This stem can only be used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click the [detail/sentence/set of sentences/line/paragraph] from [title passage \\#1] that **best** supports the same idea.\r\n[excerpted selectable text]\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] from [title text \\#1] that **best** support the same idea.\r\n[excerpted selectable text]',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            }
          ],
          taskModels: [
            {
              taskName: 'Task Model 1',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion.\r\n\r\nThe **answer choices** will present four options. Options that are paraphrased will be of similar structure. The correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.',
              examples: 'NA',
              stimulus: 'NA'
            },
            {
              taskName: 'Task Model 2',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will prompt students to choose **two** answers. \r\n\r\nThe **answer choices** will present **five** or **six** options. Options that are paraphrased will be of similar structure. Of the options, there will be **two** correct answers.  Each correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.',
              examples: 'NA',
              stimulus: 'NA'
            },
            {
              taskName: 'Task Model 3',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will indicate [one/two] options.\r\n\r\nThe **answer choices** will be selectable sentences, paragraphs, or sections from the text, or other selectable text. The text selection will be whole, continuous, and consecutive sections taken directly from the text, or other text provided. Sentences can be grouped into multi-sentence options. There will be **one or two** correct answers. The correct answer(s) will be the selectable sections of text that provide support for the given inference or conclusion. If there is more than one correct response, then the item stem will state the number of correct responses. The **distractors** will be other selectable sections of text that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.\r\n\r\n**NOTE:** If there are more than two defensible options (check every possibility), do not use this item type; use Multiple Choice (Task Model 1) or Multiple Select (Task Model 2).',
              examples: "**Format Example:**\r\n\r\n**The Format Example includes a sample of hot text from a grade 11 item and is included to provide guidance regarding *formatting purposes only*.**\r\n\r\nNote that selectable text is a whole, continuous section of text.\r\n\r\n__________________________________________________________________________\r\nThe reader can infer that Alice prefers warm weather over cold weather. Click on the line from the text that **best** supports this inference.\r\n\r\n[Ashley was sitting in the car rubbing her hands together as the deep white billowy smoke escaped from the exhaust pipe.] [I was certain the car would be warmed up, at least slightly, by the time I got in.] [I was sorely mistaken in my assumption.] [It was still just as ice-cold inside the car as it was outside in the snow.] [It actually seemed colder in the car because the heater was only thrusting cold air out of the vents.] [I looked at my sister and gave out a loud, forced shiver.] [I was shaking uncontrollably and couldn't stop my teeth from clicking against each other.] [\"Beautiful weather for a drive, eh?\" I said with a shaky grin.] [I think I finally knew what she meant when she said it was time to \"find the sun.\"]",
              stimulus: 'NA'
            }
          ],
          rubrics: [
            'Correct response: 1 point; Incorrect response: 0 points',
            'All responses correct: 1 point; Any other response combination: 0 points',
            'All responses correct: 1 point; Any other response combination: 0 points'
          ]
        },
        {
          title: 'English Language Arts Specification: Grade 3 Claim 1 Target 1',
          shortCode: 'E.G3.C1RL.T1',
          description: 'Given an inference or conclusion, use explicit details and implicit information from the text to support the inference or conclusion provided.',
          standards: [
            {
              stdCode: 'E.G3.C1RL.T1.RL.3.1',
              stdDesc: 'Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers.'
            }
          ],
          DOK: [
            {
              dokCode: 'string',
              dokDesc: 'string',
              dokShort: 'string'
            }
          ],
          type: 'CAT',
          clarification: 'Students identify/select appropriate supporting text evidence for one or more GIVEN inferences or conclusions. The item stem must state an inference or conclusion drawn from the text, not merely paraphrase or quote words directly from the text.\r\n\r\nNote: in RL Target 4, students supply both the inference/conclusion AND the evidence.\r\n\r\nAll items are text-dependent. No item is answerable without reading the text.\r\n\r\nAll items should require students to cite specific textual evidence to support conclusions drawn from the text(s).',
          heading: 'Item Writing and Scoring Guidelines',
          evidence: [
            'The student will identify text evidence (explicit details and/or implicit information) to support a GIVEN inference or conclusion based on the text.'
          ],
          vocab: 'NA',
          tools: 'NA',
          stimInfo: 'Stimuli are texts of literary fiction. Texts will include sufficient detail, both stated and implied, to allow for the formation of inferences or conclusions.\r\n\r\nRefer to Smarter Balanced Assessment Consortium: English Language Arts & Literacy Computer Adaptive Test (CAT) and Performance Task (PT) Stimulus Specifications for more information on literary text types.',
          devNotes: 'NA',
          complexity: 'NA',
          dualText: 'When a dual-text set contains one literary and one informational text, the literary text (text #1) is the primary focus, and the set of items must include items from the literary stimulus as well as items written across both texts. The informational text (text #2) must only be used as a foundational piece for the literary text, and no items can be written for only the informational text. If both texts are literary, items may be written to either or both. All dual-text stimuli sets should contain between 25-40% items written across both texts. \r\n\r\nWhen developing items from dual-text, Task Model 5 (short text constructed response-WR) should be written using the Appropriate Stems for Dual-Text Stimuli only to ensure students will have the opportunity to respond in writing to information from both texts.  Between 25-40% of all other items written in the dual-text set should be written across both texts. \r\n\r\nThe title of the each text should be included in the stem when more than one text is used.  Dual-text is considered long text.',
          accessibility: 'string',
          stem: [
            {
              stemDesc: '-   Which [detail/sentence/line] from the passage **best** supports [provide inference or conclusion based on the passage]?\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?\r\n\r\n-   The reader can [infer/conclude] [provide inference or conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion]?\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the passage].\r\n    Which [detail/sentence/line] from the passage **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion]?',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Which [detail/sentence/line] from [title text \\#1] **best** shows that [provide inference or conclusion based on both passages] is true of **both** passages? **NOTE:** This stem is only used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Which [detail/sentence/line] from [title text #1] **best** supports the same idea?',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            },
            {
              stemDesc: '-   Choose **two** [details/sentences/lines] from the passage that **best** support the [inference/conclusion] that [provide inference or conclusion based on the passage].\r\n\r\n-   Which [details/sentences/lines] from the passage **best** support [provide inference or conclusion based on the passage]? Choose **two** answers.\r\n\r\n-   [Provide inference or conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Which  [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion]? Choose **two** answers.\r\n\r\n-   Read this [inference/conclusion].\r\n    [provide inference or conclusion based on the text]\r\n    Which [details/sentences/lines] from the passage **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion]? Choose **two** answers.',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Which [details/sentences/lines] from [text \\#1 name] **best** show that [provide inference or conclusion based on the two passages] is true of  **both** passages? Choose **two** answers.\r\n**NOTE:** This stem can only be used with two literary passages.\r\nBased on the information in [title text \\#2], [provide inference or conclusion based on passage \\#2]. Which [details/sentences/lines] from [text \\#1 name] **best** support the same idea? Choose **two** answers.',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            },
            {
              stemDesc: '-   Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support [provide inference or conclusion based on the passage].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   [Provide inference or conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The reader can [infer/conclude] [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   The [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference/conclusion].\r\n[excerpted selectable text]\r\nThe [author/narrator] [infers/concludes] that [provide inference/conclusion based on the passage]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] that **best** support this [inference/conclusion] OR **best** show [provide inference/conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Inference or conclusion based on the passage].\r\nClick the [detail/sentence/set of sentences/line/paragraph] that **best** supports this [inference/conclusion] OR **best** shows [provide inference or conclusion].\r\n[excerpted selectable text]\r\n\r\n-   Read this [inference/conclusion].\r\n    [Provide inference or conclusion based on the text].\r\n    Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs that **best** support this inference/conclusion] OR **best** show [provide inference or conclusion].\r\n[excerpted selectable text]',
              shortStem: 'Appropriate Stems'
            },
            {
              stemDesc: '-   Both [title passage \\#1] and [title text \\#2] show [provide inference or conclusion based on both passages]. First, click the [detail/sentence/set of sentences/line in the paragraph] from [title text \\#1] that **best** supports [provide inference or conclusion]. Next, click on the [detail/sentence/set of sentences/line in the paragraph] from [title text #2] that also supports [provide inference or conclusion].\r\n[excerpted selectable text]\r\n**NOTE:** This stem can only be used with two **literary** passages.\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click the [detail/sentence/set of sentences/line/paragraph] from [title passage \\#1] that **best** supports the same idea.\r\n[excerpted selectable text]\r\n\r\n-   Based on the information in [title text \\#2], [provide inference or conclusion based on text \\#2]. Click **[one/two]** [details/sentences/sets of sentences/lines/paragraphs] from [title text \\#1] that **best** support the same idea.\r\n[excerpted selectable text]',
              shortStem: 'Appropriate Stems for Dual-Text Stimuli'
            }
          ],
          taskModels: [
            {
              taskName: 'Task Model 1',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion.\r\n\r\nThe **answer choices** will present four options. Options that are paraphrased will be of similar structure. The correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.',
              examples: 'NA',
              stimulus: 'NA'
            },
            {
              taskName: 'Task Model 2',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will prompt students to choose **two** answers. \r\n\r\nThe **answer choices** will present **five** or **six** options. Options that are paraphrased will be of similar structure. Of the options, there will be **two** correct answers.  Each correct answer will be a direct excerpt or a paraphrase of the text that provides support for the given inference or conclusion. The **distractors** will be direct excerpts or paraphrases of text content that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.',
              examples: 'NA',
              stimulus: 'NA'
            },
            {
              taskName: 'Task Model 3',
              taskDesc: 'The **item stem** will make an inference or draw a conclusion based on the text and pose a question that requires the student to select the text evidence that supports the given inference or conclusion. The item stem will indicate [one/two] options.\r\n\r\nThe **answer choices** will be selectable sentences, paragraphs, or sections from the text, or other selectable text. The text selection will be whole, continuous, and consecutive sections taken directly from the text, or other text provided. Sentences can be grouped into multi-sentence options. There will be **one or two** correct answers. The correct answer(s) will be the selectable sections of text that provide support for the given inference or conclusion. If there is more than one correct response, then the item stem will state the number of correct responses. The **distractors** will be other selectable sections of text that may be plausible to students who 1) misinterpret details in the text, 2) make erroneous inferences or judgments about the given inference/conclusion or about the text, OR 3) apply faulty reasoning about the text.\r\n\r\n**Distractors** will reflect common student errors. \r\n\r\n**Rationales** should state the justification for the type of plausible distractor.\r\n\r\n**NOTE:** If there are more than two defensible options (check every possibility), do not use this item type; use Multiple Choice (Task Model 1) or Multiple Select (Task Model 2).',
              examples: "**Format Example:**\r\n\r\n**The Format Example includes a sample of hot text from a grade 11 item and is included to provide guidance regarding *formatting purposes only*.**\r\n\r\nNote that selectable text is a whole, continuous section of text.\r\n\r\n__________________________________________________________________________\r\nThe reader can infer that Alice prefers warm weather over cold weather. Click on the line from the text that **best** supports this inference.\r\n\r\n[Ashley was sitting in the car rubbing her hands together as the deep white billowy smoke escaped from the exhaust pipe.] [I was certain the car would be warmed up, at least slightly, by the time I got in.] [I was sorely mistaken in my assumption.] [It was still just as ice-cold inside the car as it was outside in the snow.] [It actually seemed colder in the car because the heater was only thrusting cold air out of the vents.] [I looked at my sister and gave out a loud, forced shiver.] [I was shaking uncontrollably and couldn't stop my teeth from clicking against each other.] [\"Beautiful weather for a drive, eh?\" I said with a shaky grin.] [I think I finally knew what she meant when she said it was time to \"find the sun.\"]",
              stimulus: 'NA'
            }
          ],
          rubrics: [
            'Correct response: 1 point; Incorrect response: 0 points',
            'All responses correct: 1 point; Any other response combination: 0 points',
            'All responses correct: 1 point; Any other response combination: 0 points'
          ]
        }
      ]
    }
  ];