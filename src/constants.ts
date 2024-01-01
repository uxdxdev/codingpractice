export const API_KEY = import.meta.env.VITE_API_KEY;
export const SHEET_ID = "1qu8-hCd7ufFi4k6XdTo5x45WVgtpVXMeURSX-xz10gk";
export const SHEET_NAME_DATABASE = "database";
export const SHEET_DATABASE_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME_DATABASE}?key=${API_KEY}`;
export const intervals: number[] = [1, 3, 7, 14, 28];
export const staticProblemSet = [
  {
    Problem: "Two Sum",
    Link: "https://leetcode.com/problems/two-sum",
  },
  {
    Problem: "Valid Parentheses",
    Link: "https://leetcode.com/problems/valid-parentheses",
  },
  {
    Problem: "Merge Two Sorted Lists",
    Link: "https://leetcode.com/problems/merge-two-sorted-lists",
  },
  {
    Problem: "Best Time to Buy and Sell Stock",
    Link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
  },
  {
    Problem: "Valid Palindrome",
    Link: "https://leetcode.com/problems/valid-palindrome",
  },
  {
    Problem: "Invert Binary Tree",
    Link: "https://leetcode.com/problems/invert-binary-tree",
  },
  {
    Problem: "Valid Anagram",
    Link: "https://leetcode.com/problems/valid-anagram",
  },
  {
    Problem: "Binary Search",
    Link: "https://leetcode.com/problems/binary-search",
  },
  {
    Problem: "Flood Fill",
    Link: "https://leetcode.com/problems/flood-fill",
  },
  {
    Problem: "Maximum Subarray",
    Link: "https://leetcode.com/problems/maximum-subarray",
  },
  {
    Problem: "Lowest Common Ancestor of a Binary Search Tree",
    Link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree",
  },
  {
    Problem: "Insert Interval",
    Link: "https://leetcode.com/problems/insert-interval",
  },
  {
    Problem: "01 Matrix",
    Link: "https://leetcode.com/problems/01-matrix",
  },
  {
    Problem: "K Closest Points to Origin",
    Link: "https://leetcode.com/problems/k-closest-points-to-origin",
  },
  {
    Problem: "Balanced Binary Tree",
    Link: "https://leetcode.com/problems/balanced-binary-tree",
  },
  {
    Problem: "Linked List Cycle",
    Link: "https://leetcode.com/problems/linked-list-cycle",
  },
  {
    Problem: "Implement Queue using Stacks",
    Link: "https://leetcode.com/problems/implement-queue-using-stacks",
  },
  {
    Problem: "First Bad Version",
    Link: "https://leetcode.com/problems/first-bad-version",
  },
  {
    Problem: "Ransom Note",
    Link: "https://leetcode.com/problems/ransom-note",
  },
  {
    Problem: "Longest Substring Without Repeating Characters",
    Link: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
  },
  {
    Problem: "3Sum",
    Link: "https://leetcode.com/problems/3sum",
  },
  {
    Problem: "Binary Tree Level Order Traversal",
    Link: "https://leetcode.com/problems/binary-tree-level-order-traversal",
  },
  {
    Problem: "Clone Graph",
    Link: "https://leetcode.com/problems/clone-graph",
  },
  {
    Problem: "Evaluate Reverse Polish Notation",
    Link: "https://leetcode.com/problems/evaluate-reverse-polish-notation",
  },
  {
    Problem: "Course Schedule",
    Link: "https://leetcode.com/problems/course-schedule",
  },
  {
    Problem: "Implement Trie (Prefix Tree)",
    Link: "https://leetcode.com/problems/implement-trie-prefix-tree",
  },
  {
    Problem: "Coin Change",
    Link: "https://leetcode.com/problems/coin-change",
  },
  {
    Problem: "Product of Array Except Self",
    Link: "https://leetcode.com/problems/product-of-array-except-self",
  },
  {
    Problem: "Climbing Stairs",
    Link: "https://leetcode.com/problems/climbing-stairs",
  },
  {
    Problem: "Longest Palindrome",
    Link: "https://leetcode.com/problems/longest-palindrome",
  },
  {
    Problem: "Min Stack",
    Link: "https://leetcode.com/problems/min-stack",
  },
  {
    Problem: "Reverse Linked List",
    Link: "https://leetcode.com/problems/reverse-linked-list",
  },
  {
    Problem: "Validate Binary Search Tree",
    Link: "https://leetcode.com/problems/validate-binary-search-tree",
  },
  {
    Problem: "Number of Islands",
    Link: "https://leetcode.com/problems/number-of-islands",
  },
  {
    Problem: "Rotting Oranges",
    Link: "https://leetcode.com/problems/rotting-oranges",
  },
  {
    Problem: "Search in Rotated Sorted Array",
    Link: "https://leetcode.com/problems/search-in-rotated-sorted-array",
  },
  {
    Problem: "Combination Sum",
    Link: "https://leetcode.com/problems/combination-sum",
  },
  {
    Problem: "Permutations",
    Link: "https://leetcode.com/problems/permutations",
  },
  {
    Problem: "Merge Intervals",
    Link: "https://leetcode.com/problems/merge-intervals",
  },
  {
    Problem: "Lowest Common Ancestor of a Binary Tree",
    Link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree",
  },
  {
    Problem: "Time Based Key-Value Store",
    Link: "https://leetcode.com/problems/time-based-key-value-store",
  },
  {
    Problem: "Minimum Window Substring",
    Link: "https://leetcode.com/problems/minimum-window-substring",
  },
  {
    Problem: "Serialize and Deserialize Binary Tree",
    Link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree",
  },
  {
    Problem: "Trapping Rain Water",
    Link: "https://leetcode.com/problems/trapping-rain-water",
  },
  {
    Problem: "Find Median from Data Stream",
    Link: "https://leetcode.com/problems/find-median-from-data-stream",
  },
  {
    Problem: "Majority Element",
    Link: "https://leetcode.com/problems/majority-element",
  },
  {
    Problem: "Add Binary",
    Link: "https://leetcode.com/problems/add-binary",
  },
  {
    Problem: "Diameter of Binary Tree",
    Link: "https://leetcode.com/problems/diameter-of-binary-tree",
  },
  {
    Problem: "Middle of the Linked List",
    Link: "https://leetcode.com/problems/middle-of-the-linked-list",
  },
  {
    Problem: "Accounts Merge",
    Link: "https://leetcode.com/problems/accounts-merge",
  },
  {
    Problem: "Sort Colors",
    Link: "https://leetcode.com/problems/sort-colors",
  },
  {
    Problem: "Word Break",
    Link: "https://leetcode.com/problems/word-break",
  },
  {
    Problem: "Partition Equal Subset Sum",
    Link: "https://leetcode.com/problems/partition-equal-subset-sum",
  },
  {
    Problem: "String to Integer (atoi)",
    Link: "https://leetcode.com/problems/string-to-integer-atoi",
  },
  {
    Problem: "Spiral Matrix",
    Link: "https://leetcode.com/problems/spiral-matrix",
  },
  {
    Problem: "Subsets",
    Link: "https://leetcode.com/problems/subsets",
  },
  {
    Problem: "Binary Tree Right Side View",
    Link: "https://leetcode.com/problems/binary-tree-right-side-view",
  },
  {
    Problem: "Longest Palindromic Substring",
    Link: "https://leetcode.com/problems/longest-palindromic-substring",
  },
  {
    Problem: "Word Ladder",
    Link: "https://leetcode.com/problems/word-ladder",
  },
  {
    Problem: "Basic Calculator",
    Link: "https://leetcode.com/problems/basic-calculator",
  },
  {
    Problem: "Maximum Profit in Job Scheduling",
    Link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling",
  },
  {
    Problem: "Merge k Sorted Lists",
    Link: "https://leetcode.com/problems/merge-k-sorted-lists",
  },
  {
    Problem: "Largest Rectangle in Histogram",
    Link: "https://leetcode.com/problems/largest-rectangle-in-histogram",
  },
  {
    Problem: "Maximum Depth of Binary Tree",
    Link: "https://leetcode.com/problems/maximum-depth-of-binary-tree",
  },
  {
    Problem: "Contains Duplicate",
    Link: "https://leetcode.com/problems/contains-duplicate",
  },
  {
    Problem: "Unique Paths",
    Link: "https://leetcode.com/problems/unique-paths",
  },
  {
    Problem: "Construct Binary Tree from Preorder and Inorder Traversal",
    Link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal",
  },
  {
    Problem: "Container With Most Water",
    Link: "https://leetcode.com/problems/container-with-most-water",
  },
  {
    Problem: "Letter Combinations of a Phone Number",
    Link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number",
  },
  {
    Problem: "Word Search",
    Link: "https://leetcode.com/problems/word-search",
  },
  {
    Problem: "Find All Anagrams in a String",
    Link: "https://leetcode.com/problems/find-all-anagrams-in-a-string",
  },
  {
    Problem: "Minimum Height Trees",
    Link: "https://leetcode.com/problems/minimum-height-trees",
  },
  {
    Problem: "Task Scheduler",
    Link: "https://leetcode.com/problems/task-scheduler",
  },
  {
    Problem: "LRU Cache",
    Link: "https://leetcode.com/problems/lru-cache",
  },
  {
    Problem: "Kth Smallest Element in a BST",
    Link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst",
  },
  {
    Problem: "Daily Temperatures",
    Link: "https://leetcode.com/problems/daily-temperatures",
  },
  {
    Problem: "House Robber",
    Link: "https://leetcode.com/problems/house-robber",
  },
  {
    Problem: "Roman to Integer",
    Link: "https://leetcode.com/problems/roman-to-integer",
  },
  {
    Problem: "Backspace String Compare",
    Link: "https://leetcode.com/problems/backspace-string-compare",
  },
  {
    Problem: "Gas Station",
    Link: "https://leetcode.com/problems/gas-station",
  },
  {
    Problem: "Next Permutation",
    Link: "https://leetcode.com/problems/next-permutation",
  },
  {
    Problem: "Valid Sudoku",
    Link: "https://leetcode.com/problems/valid-sudoku",
  },
  {
    Problem: "Group Anagrams",
    Link: "https://leetcode.com/problems/group-anagrams",
  },
  {
    Problem: "Maximum Product Subarray",
    Link: "https://leetcode.com/problems/maximum-product-subarray",
  },
  {
    Problem: "Design Add and Search Words Data Structure",
    Link: "https://leetcode.com/problems/design-add-and-search-words-data-structure",
  },
  {
    Problem: "Pacific Atlantic Water Flow",
    Link: "https://leetcode.com/problems/pacific-atlantic-water-flow",
  },
  {
    Problem: "Remove Nth Node From End of List",
    Link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list",
  },
  {
    Problem: "Find the Duplicate Number",
    Link: "https://leetcode.com/problems/find-the-duplicate-number",
  },
  {
    Problem: "Top K Frequent Words",
    Link: "https://leetcode.com/problems/top-k-frequent-words",
  },
  {
    Problem: "Binary Tree Maximum Path Sum",
    Link: "https://leetcode.com/problems/binary-tree-maximum-path-sum",
  },
  {
    Problem: "Maximum Frequency Stack",
    Link: "https://leetcode.com/problems/maximum-frequency-stack",
  },
  {
    Problem: "Counting Bits",
    Link: "https://leetcode.com/problems/counting-bits",
  },
  {
    Problem: "Longest Increasing Subsequence",
    Link: "https://leetcode.com/problems/longest-increasing-subsequence",
  },
  {
    Problem: "Course Schedule II",
    Link: "https://leetcode.com/problems/course-schedule-ii",
  },
  {
    Problem: "Swap Nodes in Pairs",
    Link: "https://leetcode.com/problems/swap-nodes-in-pairs",
  },
  {
    Problem: "Path Sum II",
    Link: "https://leetcode.com/problems/path-sum-ii",
  },
  {
    Problem: "Longest Consecutive Sequence",
    Link: "https://leetcode.com/problems/longest-consecutive-sequence",
  },
  {
    Problem: "Rotate Array",
    Link: "https://leetcode.com/problems/rotate-array",
  },
  {
    Problem: "Odd Even Linked List",
    Link: "https://leetcode.com/problems/odd-even-linked-list",
  },
  {
    Problem: "Decode String",
    Link: "https://leetcode.com/problems/decode-string",
  },
  {
    Problem: "Contiguous Array",
    Link: "https://leetcode.com/problems/contiguous-array",
  },
  {
    Problem: "Maximum Width of Binary Tree",
    Link: "https://leetcode.com/problems/maximum-width-of-binary-tree",
  },
  {
    Problem: "Find K Closest Elements",
    Link: "https://leetcode.com/problems/find-k-closest-elements",
  },
  {
    Problem: "Longest Repeating Character Replacement",
    Link: "https://leetcode.com/problems/longest-repeating-character-replacement",
  },
  {
    Problem: "Median of Two Sorted Arrays",
    Link: "https://leetcode.com/problems/median-of-two-sorted-arrays",
  },
  {
    Problem: "Same Tree",
    Link: "https://leetcode.com/problems/same-tree",
  },
  {
    Problem: "Number of 1 Bits",
    Link: "https://leetcode.com/problems/number-of-1-bits",
  },
  {
    Problem: "Longest Common Prefix",
    Link: "https://leetcode.com/problems/longest-common-prefix",
  },
  {
    Problem: "Jump Game",
    Link: "https://leetcode.com/problems/jump-game",
  },
  {
    Problem: "Add Two Numbers",
    Link: "https://leetcode.com/problems/add-two-numbers",
  },
  {
    Problem: "Generate Parentheses",
    Link: "https://leetcode.com/problems/generate-parentheses",
  },
  {
    Problem: "Sort List",
    Link: "https://leetcode.com/problems/sort-list",
  },
  {
    Problem: "Subarray Sum Equals K",
    Link: "https://leetcode.com/problems/subarray-sum-equals-k",
  },
  {
    Problem: "Asteroid Collision",
    Link: "https://leetcode.com/problems/asteroid-collision",
  },
  {
    Problem: "Random Pick with Weight",
    Link: "https://leetcode.com/problems/random-pick-with-weight",
  },
  {
    Problem: "Kth Largest Element in an Array",
    Link: "https://leetcode.com/problems/kth-largest-element-in-an-array",
  },
  {
    Problem: "Longest Increasing Path in a Matrix",
    Link: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix",
  },
  {
    Problem: "Longest Valid Parentheses",
    Link: "https://leetcode.com/problems/longest-valid-parentheses",
  },
  {
    Problem: "Single Number",
    Link: "https://leetcode.com/problems/single-number",
  },
  {
    Problem: "Palindrome Linked List",
    Link: "https://leetcode.com/problems/palindrome-linked-list",
  },
  {
    Problem: "Move Zeroes",
    Link: "https://leetcode.com/problems/move-zeroes",
  },
  {
    Problem: "Maximal Square",
    Link: "https://leetcode.com/problems/maximal-square",
  },
  {
    Problem: "Rotate Image",
    Link: "https://leetcode.com/problems/rotate-image",
  },
  {
    Problem: "Binary Tree Zigzag Level Order Traversal",
    Link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal",
  },
  {
    Problem: "Path Sum III",
    Link: "https://leetcode.com/problems/path-sum-iii",
  },
  {
    Problem: "Pow(x, n)",
    Link: "https://leetcode.com/problems/powx-n",
  },
  {
    Problem: "Search a 2D Matrix",
    Link: "https://leetcode.com/problems/search-a-2d-matrix",
  },
  {
    Problem: "Largest Number",
    Link: "https://leetcode.com/problems/largest-number",
  },
  {
    Problem: "Word Search II",
    Link: "https://leetcode.com/problems/word-search-ii",
  },
  {
    Problem: "Bus Routes",
    Link: "https://leetcode.com/problems/bus-routes",
  },
  {
    Problem: "Symmetric Tree",
    Link: "https://leetcode.com/problems/symmetric-tree",
  },
  {
    Problem: "Missing Number",
    Link: "https://leetcode.com/problems/missing-number",
  },
  {
    Problem: "Decode Ways",
    Link: "https://leetcode.com/problems/decode-ways",
  },
  {
    Problem: "Reverse Integer",
    Link: "https://leetcode.com/problems/reverse-integer",
  },
  {
    Problem: "Set Matrix Zeroes",
    Link: "https://leetcode.com/problems/set-matrix-zeroes",
  },
  {
    Problem: "Reorder List",
    Link: "https://leetcode.com/problems/reorder-list",
  },
  {
    Problem: "Cheapest Flights Within K Stops",
    Link: "https://leetcode.com/problems/cheapest-flights-within-k-stops",
  },
  {
    Problem: "All Nodes Distance K in Binary Tree",
    Link: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree",
  },
  {
    Problem: "Sliding Window Maximum",
    Link: "https://leetcode.com/problems/sliding-window-maximum",
  },
  {
    Problem: "Palindrome Number",
    Link: "https://leetcode.com/problems/palindrome-number",
  },
  {
    Problem: "Convert Sorted Array to Binary Search Tree",
    Link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree",
  },
  {
    Problem: "Reverse Bits",
    Link: "https://leetcode.com/problems/reverse-bits",
  },
  {
    Problem: "Subtree of Another Tree",
    Link: "https://leetcode.com/problems/subtree-of-another-tree",
  },
  {
    Problem: "Squares of a Sorted Array",
    Link: "https://leetcode.com/problems/squares-of-a-sorted-array",
  },
  {
    Problem: "3Sum Closest",
    Link: "https://leetcode.com/problems/3sum-closest",
  },
  {
    Problem: "Rotate List",
    Link: "https://leetcode.com/problems/rotate-list",
  },
  {
    Problem: "Find Minimum in Rotated Sorted Array",
    Link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array",
  },
  {
    Problem: "Basic Calculator II",
    Link: "https://leetcode.com/problems/basic-calculator-ii",
  },
  {
    Problem: "Combination Sum IV",
    Link: "https://leetcode.com/problems/combination-sum-iv",
  },
  {
    Problem: "Insert Delete GetRandom O(1)",
    Link: "https://leetcode.com/problems/insert-delete-getrandom-o1",
  },
  {
    Problem: "Non-overlapping Intervals",
    Link: "https://leetcode.com/problems/non-overlapping-intervals",
  },
  {
    Problem: "Palindrome Pairs",
    Link: "https://leetcode.com/problems/palindrome-pairs",
  },
  {
    Problem: "Reverse Nodes in k-Group",
    Link: "https://leetcode.com/problems/reverse-nodes-in-k-group",
  },
  {
    Problem: "Sudoku Solver",
    Link: "https://leetcode.com/problems/sudoku-solver",
  },
  {
    Problem: "First Missing Positive",
    Link: "https://leetcode.com/problems/first-missing-positive",
  },
  {
    Problem: "N-Queens",
    Link: "https://leetcode.com/problems/n-queens",
  },
  {
    Problem: "Smallest Range Covering Elements from K Lists",
    Link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists",
  },
];
