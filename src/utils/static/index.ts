export interface Hash {
  [key: string]: string | undefined;
  data?: string;
}

export const elaClaims: Hash = {
  C1: 'Literary Reading/Informational Reading',
  C2: 'Writing',
  C3: 'Listening',
  C4: 'Research'
};

export const elaShortCodes: Hash = {
  'C1.T1': 'Key Details',
  'C1.T2': 'Central Ideas',
  'C1.T3': 'Word Meanings',
  'C1.T4': 'Reasoning & Evidence',
  'C1.T5': 'Analysis within or Across Texts',
  'C1.T6': 'Text Structures & Features',
  'C1.T7': 'Language Use',
  'C1.T8': 'Key Details',
  'C1.T9': 'Central Ideas',
  'C1.T10': 'Word Meanings',
  'C1.T11': 'Reasoning & Evidence',
  'C1.T12': 'Analysis within or Across Texts',
  'C1.T13': 'Text Structures & Features',
  'C1.T14': 'Language Use',
  'C2.T1a': 'Write Brief Narrative Texts',
  'C2.T1b': 'Revise Brief Narrative Texts',
  'C2.T2': 'Compose Full Informational Texts',
  'C2.T3a': 'Write Brief Informational Texts',
  'C2.T3b': 'Revise Brief Informational Texts',
  'C2.T4': 'Compose Full Informational Texts',
  'C2.T5': 'Use Informational Text Features',
  'C2.T6a': 'Write Brief Argumentative Texts',
  'C2.T6b': 'Revise Brief Argumentative Texts',
  'C2.T7': 'Compose Full Argumentative Texts',
  'C2.T8': 'Language & Vocabulary Use',
  'C2.T9': 'Editing',
  'C3.T4': 'Listen and Interpret',
  'C4.T2': 'Analyze & Integrate Information',
  'C4.T3': 'Evaluate Information & Sources',
  'C4.T4': 'Use Evidence'
};

export const mathClaims: Hash = {
  C1: '1. Content and Procedures',
  C2: '2. Problem Solving',
  C3: '3. Communication Reasoning',
  C4: '4. Modeling and Data Analysis'
};

export const mathShortCodes: Hash = {
  // claims 2-4 have the same target names for all grades
  'C2.TA':
    'Apply mathematics to solve well-posed problems in pure mathematics and arising in everday life, society, and the workplace.',
  'C2.TB': 'Select and use appropriate tools strategically.',
  'C2.TC': 'Interpret results in the context of a situation.',
  'C2.TD': 'Identify important quantitites in a practical situaion and map ther relationships.',
  'C3.TA': 'Test propositions or conjectures with specific examples.',
  'C3.TB':
    'Construct , autonomously, chains of reasoning that will justify or refute propositions or conjectures.',
  'C3.TC': 'State logical assumptions being used.',
  'C3.TD': 'Use the technique of breaking an argument into cases.',
  'C3.TE':
    'Distinguish correct logic or reasoning from that which is flawed and -if there is a flaw in the arguemnt - explain what it is.',
  'C3.TF': 'Base arguments on concrete referents such as objects, drawings, diagrams, and actions.',
  'C3.TG': 'At later grades, determine conditions under which an argument does and does not apply.',
  'C4.TA':
    'Apply mathematics to solve problems arising in everday life, society, and the workplace. ',
  'C4.TB':
    'Construct , autonomously, chains of reasoning to justify mathematical models used, interpretations made, and solutions proposed for a complex problem.',
  'C4.TC': 'State logical assumptions being used',
  'C4.TD': 'Interpret results in the context of a situation.',
  'C4.TE':
    'Analyze the adequacy of and make improvements to an existing model or develop a mathematical modle of a real phenomenon.',
  'C4.TF': 'Identify importan quantities in a practical situation and map their relationships. ',
  'C4.TG':
    'Identify, analyze, and synthesize relevant external resources to pose or solve problems.',
  // special case for claim 1
  'M.G3.C1OA.TA': 'Represent and solve problems involving multiplication and division',
  'M.G3.C1OA.TB':
    'Understand properties of multiplication and the relationship between multiplication and division.',
  'M.G3.C1OA.TC': 'Multiply and divide within 100',
  'M.G3.C1OA.TD':
    'Solve problems involving the four operations, and identify and explain patterns in arithmetic',
  'M.G3.C1NBT.TE':
    'Use place value understanding and properties of operations to perform multidigit arithmetic',
  'M.G3.C1NF.TF': 'Develop understanding of fractions as numbers.',
  'M.G3.C1MD.TG':
    'Solve problems involving measurement and estimation of intervals of time, liquid volumes, and masses of objects.',
  'M.G3.C1MD.TH': 'Represent and interpret data.',
  'M.G3.C1MD.TI': 'Geometric measurement: Area',
  'M.G3.C1MD.TJ': 'Geometric measurement: Perimeter',
  'M.G3.C1G.TK': 'Reason with shapes and their attributes.',
  'M.G4.C1OA.TA': 'Use the four operations with whole numbers to solve',
  'M.G4.C1OA.TB': 'Gain familiarity with factors and multiples',
  'M.G4.C1OA.TC': 'Generate and analyze patterns',
  'M.G4.C1NBT.TD': 'Generalize place value understanding for multi-digit whole numbers',
  'M.G4.C1NBT.TE':
    'Use place value understanding and properties of operations to perform multidigit arithmetic',
  'M.G4.C1NF.TF': 'Extend understanding of fraction equivalence and ordering',
  'M.G4.C1NF.TG':
    'Build fractions from unit fractions by applying and extending previous 12 understandings of operations on whole numbers',
  'M.G4.C1NF.TH': 'Understand decimal notation for fractions, and compare decimal fractions',
  'M.G4.C1MD.TI':
    'Solve problems involving measurement and conversion of measurements from a larger unit to a smaller unit.',
  'M.G4.C1MD.TJ': 'Represent and interpret data.',
  'M.G4.C1MD.TK': 'Geometric measurement: understand concepts of angle and measure angles.',
  'M.G4.C1G.TL':
    'Draw and identify lines and angles, and classify shapes by properties of their lines and angles',
  'M.G5.C1OA.TA': 'Write and interpret numerical expressions',
  'M.G5.C1OA.TB': 'Analyze patterns and relationships',
  'M.G5.C1NBT.TC': 'Understand the place value system',
  'M.G5.C1NBT.TD':
    'Perform operations with multi-digit whole numbers and with decimals to hundredths',
  'M.G5.C1NF.TE': 'Use equivalent fractions as a strategy to add and subtract fractions',
  'M.G5.C1NF.TF':
    'Apply and extend previous understandings of multiplication and division to multiply and divide fractions',
  'M.G5.C1MD.TG': 'Convert like measurement units within a given measurement system.',
  'M.G5.C1MD.TH': 'Represent and interpret data.',
  'M.G5.C1MD.TI':
    'Geometric measurement: understand concepts of volume and relate volume to multiplication and to addition.',
  'M.G5.C1G.TJ':
    'Graph points on the coordinate plane to solve real-world and mathematical problems',
  'M.G5.C1G.TK': 'Classify two-dimensional figures into categories based on their properties',
  'M.G6.C1RP.TA': 'Understand ratio concepts and use ratio reasoning to solve problems',
  'M.G6.C1NS.TB':
    'Apply and extend previous understandings of multiplication and division to divide fractions by fractions',
  'M.G6.C1NS.TC': 'Compute fluently with multi-digit numbers and find common factors and multiples',
  'M.G6.C1NS.TD':
    'Apply and extend previous understandings of numbers to the system of rational numbers',
  'M.G6.C1EE.TE': 'Apply and extend previous understandings of arithmetic to algebraic expressions',
  'M.G6.C1EE.TF': 'Reason about and solve one-variable equations and inequalities',
  'M.G6.C1EE.TG':
    'Represent and analyze quantitative relationships between dependent and independent variables',
  'M.G6.C1G.TH':
    'Solve real-world and mathematical problems involving area, surface area, and volume',
  'M.G6.C1SP.TI': 'Develop understanding of statistical variability.',
  'M.G6.C1SP.TJ': 'Summarize and describe distributions',
  'M.G7.C1RP.TA':
    'Analyze proportional relationships and use them to solve real-world and mathematical problems',
  'M.G7.C1NS.TB':
    'Apply and extend previous understandings of operations with fractions to add, subtract, multiply, and divide rational numbers',
  'M.G7.C1EE.TC': 'Use properties of operations to generate equivalent expressions',
  'M.G7.C1EE.TD':
    'Solve real-life and mathematical problems using numerical and algebraic expressions and equations',
  'M.G7.C1G.TE':
    'Draw, construct, and describe geometrical figures and describe the relationship between them',
  'M.G7.C1G.TF':
    'Solve real-life and mathematical problems involving angle measure, area, surface area, and volume',
  'M.G7.C1SP.TG': 'Use random sampling to draw inferences about a population.',
  'M.G7.C1SP.TH': 'Draw informal comparative inferences about two populations.',
  'M.G7.C1SP.TI': 'Investigate chance processes and develop, use, and evaluate probability models.',
  'M.G8.C1NS.TA':
    'Know that there are numbers that are not rational, and approximate them by rational numbers.',
  'M.G8.C1EE.TB': 'Work with radicals and integer exponents',
  'M.G8.C1EE.TC':
    'Understand the connections between proportional relationships, lines, and linear equations',
  'M.G8.C1EE.TD': 'Analyze and solve linear equations and pairs of simultaneous linear equations',
  'M.G8.C1F.TE': 'Define, evaluate, and compare functions.',
  'M.G8.C1F.TF': 'Use functions to model relationships between quantities',
  'M.G8.C1G.TG':
    'Understand congruence and similarity using physical models, transparencies, or geometry software',
  'M.G8.C1G.TH':
    'Understand congruence and similarity using physical models, transparencies, or 13 geometry software',
  'M.G8.C1G.TI':
    'Solve real-world and mathematical problems involving volume of cylinders, cones, and spheres',
  'M.G8.C1SP.TJ': 'Investigate patterns of association in bivariate data.',
  'M.GHS.C1N.TA':
    'Extend the properties of exponents to rational exponents;  Use properties of rational and irrational numbers;  Reason quantitatively and use units to solve problems',
  'M.GHS.C1N.TB': 'Use properties of rational and irrational numbers',
  'M.GHS.C1N.TC': 'Reason quantitatively and use units to solve problems',
  'M.GHS.C1A.TD': 'Interpret the structure of expressions',
  'M.GHS.C1A.TE': 'Write expressions in equivalent forms to solve problems',
  'M.GHS.C1A.TF': 'Perform arithmetic operations on polynomials',
  'M.GHS.C1A.TG': 'Create equations that describe numbers or relationships',
  'M.GHS.C1A.TH':
    'Understand solving equations as a process of reasoning and explain the reasoning',
  'M.GHS.C1A.TI': 'Solve equations and inequalities in one variable',
  'M.GHS.C1A.TJ': 'Represent and solve equations and inequalities graphically',
  'M.GHS.C1F.TK': 'Understand the concept of a function and use function notation',
  'M.GHS.C1F.TL': 'Interpret functions that arise in applications in terms of a context',
  'M.GHS.C1F.TM ': 'Analyze functions using different representations',
  'M.GHS.C1F.TN': 'Build a function that models a relationship between two quantities',
  'M.GHS.C1G.TO': 'Define trigonometric ratios and solve problems involving right triangles',
  'M.GHS.C1S.TP':
    'Summarize, represent, and interpret data on a single count or measurement variable'
};
