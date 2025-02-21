/**
Input: `n` - any integer
Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.

Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
 */

/**
 * Clarify: 
 * 1. So, basically the goal is to return total sum of n right? 
 *    i.e sum_to_n(4), then it means sum === 4 + 3 + 2 + 1 right?
 * 2. Whats the input constraint? i.e n are non-negative number and ranges from 1 - 100
 * 3. what should we return if n is 0 or null?
 * 
 * Solutions:
 * 1. Iteration, 
 *    O(n) time and O(1) space
 * 2. Recursion, 
 *    O(n) time and O(n) space, 
 *    because everytime we called the recursion, it will added to the stack.
 * 3. Top-down (Memoization),
 *    O(n) time and O(n) space
 * 4. Bottom-up (Tabulation),
 *    O(n) time and O(n) space
 * 5. Dynamic programming (space optimized),
 *    O(n) time and O(1) space
 */

// Options 1, Iteration
// O(n) time and O(1) space
const sum_to_n_a = (n: number): number => {
    if(n === 0) return 0;

    let sum: number = 0;

    for(let i = n; i >= 0; i--) {
        sum = sum + i;
    }

    return sum;
};

console.log(sum_to_n_a(5)); // expected output: 15
/**
DRY RUN

case 1
n = 5

i = 5
sum = 0 + 5 -> 5
i = 4
sum = 5 + 4 -> 9
i = 3
sum = 9 + 3 -> 12
i = 2
sum = 12 + 2 -> 14
i = 1
sum = 14 + 1 -> 15
exit looping

return sum -> 15

 */

// Options 2. Recursion
// O(n) time and O(n) space
const sum_to_n_b = (n: number): number => {
    if(n === 0) return 0;
    
    return n + sum_to_n_b(n - 1);
};

console.log(sum_to_n_b(5)); // expected output: 15

/**
DRY RUN
n = 5
called  5 + sum_to_n_b(4)
return 5 + 10 -> 15

sum_to_n_b(4)
n = 4
called 4 + sum_to_n_b(3)
return 4 + 6 -> 10

sum_to_n_b(3)
n = 3
called 3 + sum_to_n_b(2)
return 3 + 3 -> 6

sum_to_n_b(2)
n = 2
called 2 + sum_to_n_b(1)
return 2 + 1 -> 3

sum_to_n_b(1)
n = 1
called 1 + sum_to_n_b(0)
return 1 + 0 -> 1

sum_to_n_b(0)
return 0

so, sum_to_n_b(5) will return 15.
 */

// options 3, Top-down (memoization)
// O(n) time and O(n) space
const sum_to_n_c = (n: number): number => {
    // n + 1 because we need to store the value from index 0
    let memo = new Array(n + 1).fill(0); // O(n) space

    // O(n) time
    const memoization = (n: number, memo: number[]): number => {
        if(n === 0) return 0;

        // check if the cache already exist, to avoid overhead computation
        if(memo[n] !== null) return memo[n];

        return memo[n] = n + memoization(n - 1, memo);
    }

    return memoization(n, memo)
};

console.log(sum_to_n_b(4)); // expected output: 10

/**
 * DRY RUN
 * n = 4
 * called memoization(4, [0, 0, 0, 0, 0)
 * return memo[4] -> 10
 * 
 * memoization(4, [0, 0, 0, 0, 0])
 * return memo[4] = 4 + memoization(3, memo);
 * memo = [null, 1, 3, 6, 10]
 * 
 * memoization(3, memo)
 * return memo[3] = 3 + memoization(2, memo);
 * return memo[3] = 3 + 3
 * memo = [0, 1, 3, 6, 0]
 * 
 * memoization(2, memo)
 * return memo[2] = 2 + memoization(1, memo);
 * return memo[2] = 2 + 1
 * memo = [0, 1, 3, 0, 0]
 * 
 * memoization(1, memo)
 * return memo[1] = 1 + memoization(0, memo);
 * return memo[1] = 1 + 0;
 * memo = [0, 1, 0, 0, 0;
 * 
 * memoization(0, memo);
 * return 0;
 */

// options 4, Bottom-up (Tabulation)
// O(n) time and O(n) space
const sum_to_n_d = (n: number): number => {
    // n + 1 because we need to store the value from index 0
    let dp = new Array(n + 1).fill(0); // O(n) space

    // O(n) time
    for(let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] + i;
    }

    return dp[n];
};

console.log(sum_to_n_d(4)); // expected output: 10

/**
 * DRY RUN
 * 
 * n = 4
 * dp = [0, 0, 0, 0, 0]; 
 * 
 * i = 1, i <= 4
 * dp[1] = dp[0] + 1
 * dp[1] = 0 + 1
 * dp = [0, 1, 0, 0, 0];
 * 
 * i = 2, i <= 4
 * dp[2] = dp[1] + 2
 * dp[2] = 1 + 2
 * dp = [0, 1, 3, 0, 0]
 * 
 * i = 3, i <= 4
 * dp[3] = dp[2] + 3
 * dp[3] = 3 + 3
 * dp = [0, 1, 3, 6, 0]
 * 
 * i = 4, i <= 4
 * dp[4] = dp[3] + 4
 * dp[4] = 6 + 4
 * dp = [0, 1, 3, 6, 10]
 * 
 * return dp[4] -> 10
 */

// options 5, Dynamic Programming (Space optimized)
// O(n) time and O(1) space
const sum_to_n_e = (n: number): number => {
    if(n === 0) return 0;

    let sum = 0;

    // O(n) time and O(1) space
    for(let i = 1; i <= n; i++) {
        sum = sum + i;
    }

    return sum;
};

console.log(sum_to_n_d(3)); // expected output: 6

/**
 * DRY RUN
 * 
 * n = 3
 * 
 * i = 1, i <= 3
 * sum = 0 + 1 -> 1
 * 
 * i = 2, i <= 3
 * sum = 1 + 2 -> 3
 * 
 * i = 3, i <= 3
 * sum = 3 + 3 -> 6
 * 
 * exit looping
 * 
 * return sum -> 6
 * 
 */