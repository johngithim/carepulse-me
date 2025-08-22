
    }

    req.user = decoded;
    next();
  });
};

const verifyUserTable = async (req, res, next) => {

  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {

  }
  next();
};

