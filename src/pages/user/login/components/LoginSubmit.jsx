import { Button, Form } from "antd";
import React from "react";
import styles from "./index.less";
const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
  return (
    <FormItem>
      <Button
        size="large"
        className={styles.submit}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
