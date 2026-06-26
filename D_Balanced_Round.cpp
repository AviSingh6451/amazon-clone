#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    while (t--) {
        int n;
        long long k;
        cin >> n >> k;

        vector<long long> a(n);
        for (int i = 0; i < n; i++)
            cin >> a[i];

        sort(a.begin(), a.end());

        int longest = 1;
        int cnt = 1;

        for (int i = 1; i < n; i++) {
            if (a[i] - a[i - 1] <= k) {
                cnt++;
            } else {
                longest = max(longest, cnt);
                cnt = 1;
            }
        }

        longest = max(longest, cnt);

        cout << n - longest << '\n';
    }

    return 0;
}