# pw

Secure deterministic password generator running at [http://pw.kevinjs.com](http://pw.kevinjs.com)

The main code is found in `index.js`.

### The Problem:

You have lots of accounts online, and they all require a password.

You don't want to use the same password (or even a few passwords) for every account you have. This is insecure, because if your password for one site is compromised, ALL of your accounts are compromised.

#### Why not use a password manager?

Ideally, your passwords should be random (like "r7TB$.l-8df") so that they can't be guessed from dictionary words or common substitutions. But remembering a different password for each and every account you have is impossible!

A common solution is to use a password manager like [LastPass](https://lastpass.com/) or [1Password](https://agilebits.com/onepassword) to keep track of all your secure passwords. But what if you are at a public computer and you don't have any way to access your password manager? Or what if you need to log in from another device that you can't or don't want to install your password manager on? Plus, I'm not so sure about trusting the keys to my entire online identity to a third party.

A password manager is better than nothing, but we can do better.

### The Solution:

What if you had a completely unique, secure password for each of your accounts, and you just needed to remember a single master password and have access to any web browser to access them? That's what this tool does.

Basically, it is able to generate a unique password from the combination of your master password and the name of a website you have an account for. The password it generates is deterministic, meaning the output will always be the same given the same inputs.

It does not store anything or remember what you type. In fact, you can download the page and use it offline on your own computer if you want. It all runs in the browser.

### Instructions:

1. Pick a secure, unique password that you don't use ANYWHERE else. This will be your master password, used to generate all the passwords you want to store. Let's pretend that mine is "password" (it's not).
2. Pick a website to generate a password for. Let's pick Facebook as an example.
3. Enter your master password in the first box, and the name of the website ("facebook") in the second box.
4. Hit enter, and your Facebook password will appear on the page.
5. Use this as your Facebook password. Whenever you want to log in to Facebook, you can come back to this website on any device and generate the same password again.
6. If you're positive that nobody you don't trust will ever get access to your computer or phone, feel free to save the password in the browser for convenience.
7. If the website you want to use doesn't let you put symbols in your password, check the checkbox to eliminate symbols. Remember that you have to check the box every time you want to get that site's password.
8. It's safe to write down the exact website names you used and whether or not they have symbols, since nobody else knows your master password.

#### Caveat:

You can't change your password for a single site without either changing your master password (which would force you to change all your other passwords as well), using multiple master passwords (back to the memory problem), or changing the name you use for that site (perhaps by adding a number and keeping that number somewhere).
