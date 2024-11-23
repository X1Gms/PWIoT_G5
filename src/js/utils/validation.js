export const validator = {
  email(value) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(value);
  },
  password(value) {
    const hasMinLength = /^.{8,}$/.test(password);

    const hasCapitalAndLowercase = /^(?=.*[A-Z])(?=.*[a-z])/.test(password);

    const hasNumbersOrSymbols = /^(?=.*[\d@$!%*#?&])/.test(password);

    if (hasMinLength) {
      return "Should contain at least 8 characters";
    }
    if (hasCapitalAndLowercase) {
      return "Should contain both lowercase and capital letters";
    }
    if (hasNumbersOrSymbols) {
      return "Should contain symbols and numbers";
    }

    return true;
  },
  required(value) {
    return value.trim() !== "";
  },
  name(value) {
    const regex = /^[A-Z].*/;
    return regex.test(value);
  },
};
